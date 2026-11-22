import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile as callbackExec } from 'node:child_process';
import { promisify } from 'node:util';
import { chromium } from '@playwright/test';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table';
import { parseArgs } from 'node:util';
import { prototypeFile, choiceHeadings, firstResultHeading, introductionHeading,
  wrapPrototypePanel, paperReference, facingPlacement } from './prototype-layout.mjs';

const execFile = promisify(callbackExec);
const printPython = process.env.VCTW_PRINT_PYTHON || 'python3';
const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../..');
const release = JSON.parse(await readFile(path.join(here, 'edition.json'), 'utf8'));
const { values } = parseArgs({ options: {
  stage: { type: 'string', default: 'final' },
  'check-inputs': { type: 'boolean' },
} });
assert.match(values.stage, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const manuscriptRoot = path.join(repo, 'book/revisions/zh/volume-one-making-of');
const pdfName = 'volume-one-zh-a5.pdf';
const htmlName = pdfName.replace(/\.pdf$/, '.html');
const output = path.join(repo, '.artifacts/print', values.stage);
if (!values['check-inputs']) {
  await mkdir(path.dirname(output), { recursive: true });
  await mkdir(output);
}
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const write = (name, data) => writeFile(path.join(output, name), data);
const json = (name, data) => write(name, JSON.stringify(data, null, 2) + '\n');
const escape = html => html.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const element = (tag, html, attrs = '') => `<${tag}${attrs}>${html}</${tag}>`;
const markdown = source => fromMarkdown(source, {
  extensions: [gfmTable()], mdastExtensions: [gfmTableFromMarkdown()],
});
const text = node => node.type === 'image' ? node.alt : 'value' in node ? node.value : node.children?.map(text).join('') ?? '';
const normalize = source => source.normalize('NFKC').replace(/\s/gu, '');
function walk(node, visit) {
  visit(node);
  node.children?.forEach(child => walk(child, visit));
}
function slug(title) {
  return title.normalize('NFC').toLowerCase().replace(/[^\p{Letter}\p{Number}\p{Mark}\s-]/gu, '')
    .trim().replace(/[\s-]+/g, '-') || 'section';
}
const indexBytes = await readFile(path.join(manuscriptRoot, 'README.md'));
const rawIndex = indexBytes.toString('utf8');
const volumeHash = createHash('sha256');
const includeInVolumeHash = (file, bytes) => volumeHash
  .update(path.relative(repo, path.join(manuscriptRoot, file))).update('\0').update(bytes).update('\0');
includeInVolumeHash('README.md', indexBytes);
const partLabels = '一二三四五六七八';
const groups = [{ key: 'preface', title: '序言', entries: [] }];
const ignoredIndexLinks = [];
let group = groups[0];
let lastPart = 0;
const subentries = [];
function addIndexLink(link) {
  const [localPath, fragment] = link.url.split('#');
  const name = localPath.replace(/^\.\//, '');
  if (!group || !/^[^/\\]+\.md$/u.test(name) || name === 'README.md' || name.includes(':')) {
    ignoredIndexLinks.push(link.url); return;
  }
  if (fragment) {
    if (group.key === 'closing') subentries.push({ file: name, fragment: decodeURIComponent(fragment), title: text(link) });
    else ignoredIndexLinks.push(link.url);
    return;
  }
  if (group.key === 'preface' && !/^(00[-.]|序言|前言)/u.test(name) && !/^(写在前面|序言|前言)/u.test(text(link))) {
    ignoredIndexLinks.push(link.url); return;
  }
  // The index can label a file again via an attachment or a section. Print each source once.
  if (groups.some(part => part.entries.some(entry => entry.file === name))) {
    ignoredIndexLinks.push(link.url); return;
  }
  group.entries.push({ file: name, indexTitle: text(link) });
}
for (const node of markdown(rawIndex).children) {
  if (node.type === 'heading' && node.depth === 2) {
    const label = text(node);
    const part = /^第\s*([一二三四五六七八1-8])\s*[部篇]/u.exec(label);
    if (part) {
      const number = Number(part[1]) || partLabels.indexOf(part[1]) + 1;
      assert.equal(number, ++lastPart, `Unexpected part order in index: ${label}`);
      group = { key: `part-${number}`, number, title: label, entries: [] };
      groups.push(group);
    } else if (/(收尾|尾声|结语|程序员下班指南)/u.test(label)) {
      group = { key: 'closing', title: label, entries: [] };
      groups.push(group);
    } else if (/(序言|前言|写在前面)/u.test(label) && lastPart === 0) {
      group = groups[0];
    } else {
      group = null;
    }
    if (group) node.children.filter(child => child.type === 'link').forEach(addIndexLink);
  }
  if (node.type === 'list') {
    for (const item of node.children) {
      const link = item.children[0]?.children?.find(child => child.type === 'link');
      if (link) addIndexLink(link);
    }
  }
  if (node.type === 'paragraph') {
    const direct = node.children.filter(child => child.type === 'link');
    if (direct.length === 1 && text(node).trim() === text(direct[0]).trim()) addIndexLink(direct[0]);
  }
}

const selected = groups;
assert.equal(selected[0].entries.length, 1, 'Index must identify exactly one preface');
assert.equal(selected.filter(part => part.number).length, 8, 'The whole book needs eight parts');
assert.ok(selected.every(part => part.entries.length > 0), 'Every printed group must have chapters in the index');
assert.equal(selected.at(-1).key, 'closing', 'The whole book needs a closing section');
const files = new Map();
const snapshot = path.join(output, 'source-files');
if (!values['check-inputs']) {
  await mkdir(snapshot, { recursive: true });
  await writeFile(path.join(snapshot, 'README.md'), indexBytes);
}
const root = await realpath(manuscriptRoot);
for (const part of selected) {
  for (const entry of part.entries) {
    const resolved = await realpath(path.join(root, entry.file));
    assert.equal(path.dirname(resolved), root, `Chapter escapes source directory: ${entry.file}`);
    const sourceBytes = await readFile(resolved);
    const source = sourceBytes.toString('utf8');
    includeInVolumeHash(entry.file, sourceBytes);
    if (!values['check-inputs']) await writeFile(path.join(snapshot, entry.file), sourceBytes);
    const tree = markdown(source);
    assert.equal(tree.children[0]?.type, 'heading', entry.file);
    assert.equal(tree.children[0]?.depth, 1, entry.file);
    if (tree.children[1]?.type === 'blockquote' && text(tree.children[1]) === '中文初稿 · 待 review') tree.children.splice(1, 1);
    const body = tree.children.slice(1).map(text).join('\n');
    const headings = new Map();
    const used = new Set(['main']);
    const id = 'chapter-' + (files.size + 1);
    let titleCount = 0;
    let section;
    walk(tree, node => {
      node.children?.forEach((child, index, siblings) => {
        if (child.type === 'link' && siblings[index + 1]?.type === 'text') child.followingText = siblings[index + 1].value;
      });
      if (node.type === 'link') node.sourceSection = section;
      if (node.type !== 'heading') return;
      const title = text(node);
      const base = slug(title);
      let headingId = base;
      for (let ordinal = 2; used.has(headingId); ordinal++) headingId = base + '-' + ordinal;
      used.add(headingId);
      if (node.depth === 1) titleCount++;
      node.anchor = node.depth === 1 ? id : id + '-' + headingId;
      section = { id: node.anchor, title, depth: node.depth };
      headings.set(headingId, section);
    });
    assert.equal(titleCount, 1, `Expected one chapter title in ${entry.file}`);
    const data = Object.assign(entry, { id, title: text(tree.children[0]), part: part.key, tree, headings,
      sha256: sha256(sourceBytes), han: Array.from(body.matchAll(/\p{Script=Han}/gu)).length,
      nonWhitespace: Array.from(body.replace(/\s/gu, '')).length, lastText: normalize(body).slice(-60) });
    files.set(entry.file, data);
  }
}

const orderedSourceSha256 = volumeHash.digest('hex');
assert.equal(orderedSourceSha256, release.orderedSourceSha256, 'The manuscript differs from this print edition');
const assetInfo = new Map();
const assets = new Map();
async function assetData(assetFile) {
  if (!assets.has(assetFile)) {
    const ext = path.extname(assetFile).toLowerCase();
    const format = { '.svg': 'svg+xml', '.png': 'png', '.jpg': 'jpeg', '.jpeg': 'jpeg', '.webp': 'webp' }[ext];
    assert.ok(format, `Unsupported print image: ${assetFile}`);
    const bytes = await readFile(assetFile);
    assetInfo.set(assetFile, { path: path.relative(repo, assetFile), sha256: sha256(bytes), bytes: bytes.length });
    assets.set(assetFile, 'data:image/' + format + ';base64,' + bytes.toString('base64'));
  }
  return assets.get(assetFile);
}
const cover = await assetData(await realpath(path.join(repo, 'book/assets/covers/cover-c-route-en-zh.png')));
const enrolment = files.has('01-a-page-and-a-system.md') ?
  await assetData(await realpath(path.join(repo, 'site/public/illustrations/home-systems-desktop.svg'))) : null;
const declaredImages = new Map();
for (const entry of files.values()) {
  const images = [];
  walk(entry.tree, node => { if (node.type === 'image') images.push(node); });
  for (const image of images) {
    assert.ok(!/^[\w+.-]+:|^\/\//u.test(image.url), `Print images require a local approved input: ${image.url}`);
    const actual = await realpath(path.resolve(root, decodeURIComponent(image.url)));
    assert.ok(actual.startsWith(path.join(repo, 'book') + path.sep), `Print image is outside the book directory: ${image.url}`);
    declaredImages.set(image, await assetData(actual));
  }
}

const internalLinks = [];
let routeFolioNumbers = {};
function linkTo(node, entry) {
  if (/^https?:\/\//i.test(node.url)) return { href: node.url, reference: '' };
  const [file, fragment] = node.url.split('#');
  const name = file ? path.posix.normalize(decodeURIComponent(file)) : entry.file;
  const targetChapter = files.get(name);
  assert.ok(targetChapter, `${entry.file}: unbound manuscript link ${node.url}`);
  const target = fragment ? targetChapter.headings.get(decodeURIComponent(fragment)) : { id: targetChapter.id, title: targetChapter.title };
  assert.ok(target, `${entry.file}: missing manuscript fragment ${node.url}`);
  const panelLink = entry.file === prototypeFile || name === '02-browser-foundations.md' && target.title === '标题怎样出现在屏幕上';
  const grouped = panelLink && paperSuffix(node, entry);
  const folio = panelLink ? routeFolioNumbers[target.id] ?? '000' : null;
  const referenceText = panelLink ? grouped
    ? `〔${target.title} · 第${folio}页〕`
    : `〔第${folio}页 · ${target.title}〕` : '';
  internalLinks.push({ file: entry.file, part: entry.part, line: node.position.start.line, label: text(node),
    href: node.url, sourceId: node.sourceSection.id, sourceTitle: node.sourceSection.title,
    targetFile: name, targetId: target.id, targetTitle: target.title,
    ...(panelLink ? { printedFolio: folio, referenceText } : {}) });
  return { href: '#' + target.id, reference: panelLink ? paperReference(target.title, folio, Boolean(grouped)) : '' };

}

function paperSuffix(link, entry) {
  if (entry.file !== prototypeFile || link?.type !== 'link' || !/^#纸[一二三四五六七八]$/u.test(link.url)) return '';
  const title = link.url.slice(1);
  return [`（${title}）`, `(${title})`].find(suffix => link.followingText?.startsWith(suffix)) ?? '';
}

function render(node, entry) {
  const children = () => node.children?.map((child, index, siblings) => {
    const consumed = child.type === 'text' ? paperSuffix(siblings[index - 1], entry) : '';
    return consumed ? escape(child.value.slice(consumed.length)) : render(child, entry);
  }).join('') ?? '';
  switch (node.type) {
    case 'heading': {
      const title = children();
      const opening = entry.file === '02-browser-foundations.md' && node.depth === 1 ?
        title.replace('页面出现之前，', '页面出现之前，<br>') : title;
      return element('h' + node.depth, opening, ` id="${escape(node.anchor)}"`);
    }
    case 'text': return escape(node.value);
    case 'paragraph': {
      if (node.children.length === 1 && node.children[0].type === 'image') {
        const image = node.children[0];
        return element('figure', render(image, entry) +
          (image.title ? element('figcaption', escape(image.title)) : ''));
      }
      const action = entry.file === prototypeFile && node.children.some(child =>
        child.type === 'link' && choiceHeadings.includes(child.sourceSection.title) && Boolean(paperSuffix(child, entry)));
      return element('p', children(), action ? ' class="prototype-option"' : '');
    }
    case 'image': return `<img src="${declaredImages.get(node)}" alt="${escape(node.alt ?? '')}">`;
    case 'strong': return element('strong', children());
    case 'emphasis': return element('em', children());
    case 'inlineCode': return element('code', escape(node.value));
    case 'code': {
      const wireframe = entry.file === 'p2-one-less-click.md' && node.lang === 'text' && (/[┌┐└┘]/u.test(node.value) || /\+[-=]{3,}\+/u.test(node.value));
      return element('pre', element('code', escape(node.value)), wireframe ? ' class="wireframe"' : '');
    }
    case 'blockquote': return element('blockquote', children());
    case 'break': return '<br>';
    case 'thematicBreak': return '<hr>';
    case 'list': return element(node.ordered ? 'ol' : 'ul', children(), node.ordered ? ` start="${node.start ?? 1}"` : '');
    case 'listItem': return element('li', children());
    case 'link': {
      const link = linkTo(node, entry);
      return element('a', children() + link.reference, ` href="${escape(link.href)}"`);
    }
    case 'table': {
      const row = (item, tag) => element('tr', item.children.map(cell => element(tag, cell.children.map(child => render(child, entry)).join(''))).join(''));
      const [head, ...rows] = node.children;
      return element('table', element('thead', row(head, 'th')) + element('tbody', rows.map(item => row(item, 'td')).join('')));
    }
    default: throw new Error(`${entry.file}: unsupported print Markdown node ${node.type}`);
  }
}

function renderChapter(entry, part, firstInPart, leadPlacement) {
  const blocks = entry.tree.children;
  const originalDiagram = entry.file === '02-browser-foundations.md' ? blocks.findIndex(node => node.type === 'code' && node.value.includes('合成与呈现画面')) : -1;
  const diagramHeading = originalDiagram > 1 && blocks[originalDiagram - 2].type === 'heading' &&
    text(blocks[originalDiagram - 2]) === '标题怎样出现在屏幕上' ? originalDiagram - 2 : originalDiagram - 1;
  const supplemental = enrolment && entry.file === '01-a-page-and-a-system.md' ?
    blocks.findIndex(node => node.type === 'code' && node.value.startsWith('浏览器中的页面')) : -1;
  let label = firstInPart && part.number ? element('p', escape(part.title), ' class="part-label"') : '';
  label += render(blocks[0], entry);
  let index = 1;
  if (blocks[index]?.type === 'paragraph' && text(blocks[index]).length <= 240) label += render(blocks[index++], entry);
  const remainder = [];
  const choice = entry.file === prototypeFile ?
    [...choiceHeadings, firstResultHeading].map(title => blocks.findIndex(node => node.type === 'heading' && text(node) === title)) : [];
  if (choice.length) assert.ok(choice[0] > index && choice[0] < choice[1] && choice[1] < choice[2],
    'The prototype needs adjacent authored A/B decisions followed by result paper 1');
  const intro = choice.length ? blocks.findIndex(node => node.type === 'heading' && text(node) === introductionHeading) : -1;
  const leadIndex = intro >= 0 && leadPlacement ? (leadPlacement === 1 ? choice[0] - 1 : intro + leadPlacement - 2) : -1;
  while (index < blocks.length) {
    const block = blocks[index];
    if (choice.length && index === choice[0]) {
      remainder.push(wrapPrototypePanel(blocks.slice(choice[0], choice[1]).map(node => render(node, entry)).join('')));
      remainder.push(wrapPrototypePanel(blocks.slice(choice[1], choice[2]).map(node => render(node, entry)).join('')));
      index = choice[2];
      continue;
    }
    if (choice.length && (index === choice[2] || index === leadIndex)) {
      const remainingLead = leadIndex === index ? blocks.slice(index, choice[0]) : [block];
      const contents = remainingLead.map(node => render(node, entry)).join('');
      remainder.push(element('div', contents, ' class="prototype-new-page"'));
      index += remainingLead.length;
      continue;
    }
    if (originalDiagram >= 0 && index === diagramHeading) {
      const afterFigure = originalDiagram + 2;
      assert.equal(blocks[originalDiagram - 1].type, 'paragraph');
      assert.equal(blocks[originalDiagram + 1].type, 'paragraph');
      remainder.push(element('section', blocks.slice(index, afterFigure).map(node => render(node, entry)).join(''), ' class="diagram"'));
      index = afterFigure;
      continue;
    }
    if (index === supplemental) {
      remainder.push(element('figure', `<img src="${enrolment}" width="410" height="112" alt="一次成功报名中的四个相连阶段：提交、检查、保存和确认。"><ol class="figure-stages"><li>提交</li><li>检查</li><li>保存</li><li>确认</li></ol><figcaption>图示：一次成功的报名</figcaption>`));
    }
    const blockHtml = render(block, entry);
    remainder.push(block.type === 'paragraph' && /^(这还带来一个稍后会用到的区别|若实际项目只有给固定答案的模拟接口)/u.test(text(block)) ?
      element('div', blockHtml, ' class="keep-paragraph"') : blockHtml);
    index++;
  }
  return element('article', element('header', label, ' class="chapter-start"') + remainder.join(''),
    ` class="chapter" data-file="${escape(entry.file)}"`);
}

const tocEntries = selected.flatMap(part => part.entries.flatMap(entry => {
  const items = [{ id: entry.id, title: entry.indexTitle, file: entry.file }];
  if (part.key === 'closing') for (const sub of subentries.filter(item => item.file === entry.file)) {
    const target = entry.headings.get(sub.fragment);
    assert.ok(target, `Closing section not found: ${sub.fragment}`);
    if (!items.some(item => item.id === target.id)) items.push({ id: target.id, title: sub.title, file: entry.file, nested: true });
  }
  return items;
}));
function renderBook(leadPlacement) {
  return selected.flatMap(part => part.entries.map((entry, index) => renderChapter(entry, part, index === 0, leadPlacement))).join('');
}
const style = await readFile(path.join(here, 'print.css'), 'utf8');
const edition = '中文试读修订版 · A5';
function makeHtml(pageNumbers, body) {
  const rows = selected.map(part => {
    const chapters = tocEntries.filter(item => files.get(item.file).part === part.key);
    const links = chapters.map(({ id, title, nested }) => element('a',
      element('span', escape(title)) + element('span', String(pageNumbers[id] ?? '000')),
      ` class="${nested ? 'subentry' : 'chapter-entry'}" href="#${escape(id)}"`)).join('');
    return (part.number ? element('h3', escape(part.title)) : '') + links;
  }).join('');
  return `<!doctype html><html lang="zh-CN"><meta charset="utf-8">
<title>用 AI 写代码：能跑，然后呢？</title><style>${style}</style><body class="print-volume" data-pagination="chapter">
<header class="cover"><div class="cover-frame"><img src="${cover}" alt="用 AI 写代码：能跑，然后呢？　缸子太子与世界"></div><p class="edition">${edition}</p></header>
<section class="credits" aria-label="署名与许可"><h2>署名与许可</h2>
<p>作者　缸子太子与世界</p><p>署名、适用许可及第三方材料的例外见<a href="https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/blob/main/LICENSE-CONTENT.md">项目内容许可说明</a>。</p></section>
<nav class="contents" aria-label="目录"><h2>目录</h2>${rows}</nav>
<main>${body}</main></body></html>`;
}

if (values['check-inputs']) {
  renderBook(0);
  console.log(JSON.stringify({ orderedSourceSha256, sourceIndexSha256: sha256(indexBytes), chapters: files.size,
    contents: tocEntries.length, internalLinks, parts: selected.map(part => [part.title, part.entries.length]) }, null, 2));
  process.exit(0);
}

// Inspect the printed pages with the same native PDFKit reader used to review this edition.
const inspector = path.join(output, 'inspect-pdf');
await execFile('swiftc', [path.join(here, 'inspect.swift'), '-module-cache-path', path.join(output, 'swift-cache'), '-o', inspector]);
await execFile(printPython, ['-c', 'import pypdf']);
const browser = await chromium.launch(process.env.VCTW_PRINT_CHROME
  ? { executablePath: process.env.VCTW_PRINT_CHROME }
  : { channel: 'chrome' });
const emitPdf = async (name, html) => {
  const context = await browser.newContext({ locale: 'zh-CN', viewport: { width: 439, height: 680 } });
  try {
    await context.route('**/*', route => route.abort());
    const page = await context.newPage();
    await page.emulateMedia({ media: 'print' });
    await page.setContent(html);
    const measured = await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(image => image.decode()));
      const printWidth = document.querySelector('main').getBoundingClientRect().width;
      const conflicts = [...document.querySelectorAll('main pre, main table, main figure')].flatMap(element =>
        element.scrollWidth > Math.ceil(element.clientWidth) + 1 ? [{ tag: element.tagName, width: element.clientWidth,
          scrollWidth: element.scrollWidth, file: element.closest('article')?.dataset.file, head: element.innerText.slice(0, 80) }] : []);
      for (const table of document.querySelectorAll('th')) {
        const header = table.closest('thead').getBoundingClientRect();
        const first = table.closest('table').querySelector('tbody tr')?.getBoundingClientRect().height ?? 0;
        if (header.height + first > 680) conflicts.push({ file: table.closest('article')?.dataset.file, issue: 'header and one row exceed a whole page' });
      }
      return { printWidth, conflicts, images: document.images.length, h1: document.querySelectorAll('main h1').length,
        tables: document.querySelectorAll('table').length, figures: document.querySelectorAll('main figure, main .diagram').length,
        codeBlocks: document.querySelectorAll('main pre').length };
    });
    await page.pdf({
      path: path.join(output, name), preferCSSPageSize: true, printBackground: true,
      tagged: true, outline: true, displayHeaderFooter: true,
      margin: { top: '15mm', right: '16mm', bottom: '15mm', left: '16mm' },
      headerTemplate: '<span></span>',
      footerTemplate: '<div style="width:100%;text-align:center;color:#4e5967;font:9px sans-serif"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });
    return measured;
  } finally {
    await context.close();
  }
};

const inspect = async (pdf, outputName) => {
  await execFile(inspector, [path.join(output, pdf), path.join(output, outputName)]);
  return JSON.parse(await readFile(path.join(output, outputName), 'utf8'));
};
function contentsLinks(proof) {
  return proof.pages.slice(1).flatMap(page => page.links.filter(link => link.destination)
    .sort((a, b) => b.y - a.y || a.x - b.x).map(link => ({ ...link, onPage: page.page })));
}

const readDestinations = async name => {
  const linked = await execFile(printPython, [path.join(here, 'extract-targets.py'), path.join(output, name)]);
  return JSON.parse(linked.stdout);
};
try {
  const hasPrototype = files.has(prototypeFile);
  const pagesFromLayout = [];
  let first;
  let placement = 0;
  let facing;
  for (const candidate of hasPrototype ? [0, 1, 2, 3] : [0]) {
    internalLinks.length = 0;
    const body = renderBook(candidate);
    await emitPdf('pagination.pdf', makeHtml({}, body));
    first = await inspect('pagination.pdf', 'pagination.json');
    placement = candidate;
    if (!hasPrototype) break;
    facing = facingPlacement(first, [...choiceHeadings, firstResultHeading]);
    pagesFromLayout.push({ leadPlacement: candidate, ...facing });
    if (facing.onFacingSpread) break;
  }
  assert.ok(!hasPrototype || facing.onFacingSpread, `Cannot place A even-left, B odd-right and result on the following leaf: ${JSON.stringify(pagesFromLayout)}`);
  await json('prototype-placement.json', { accepted: facing ?? null, passes: pagesFromLayout });
  const firstInternal = contentsLinks(first).slice(0, tocEntries.length);
  assert.equal(firstInternal.length, tocEntries.length, 'Chrome must emit an actual destination for each contents link');
  const numbers = {};
  for (const [index, entry] of tocEntries.entries()) numbers[entry.id] = firstInternal[index].destination.page;
  const firstDestinations = await readDestinations('pagination.pdf');
  routeFolioNumbers = Object.fromEntries(Object.entries(firstDestinations).map(([id, target]) => [id, target.page]));
  internalLinks.length = 0;
  const body = renderBook(placement);
  const finalHtml = makeHtml(numbers, body);
  await write(htmlName, finalHtml);
  const measured = await emitPdf(pdfName, finalHtml);
  const proof = await inspect(pdfName, 'pdf-audit.json');
  assert.equal(proof.pageCount, first.pageCount, 'Contents numbers must not shift the pagination');
  assert.equal(proof.pageCount, release.pages, 'Physical page count differs from the reviewed edition');
  assert.equal(files.size, release.chapters, 'Chapter count differs from the reviewed edition');
  const finalDestinations = await readDestinations(pdfName);
  for (const link of internalLinks.filter(link => link.printedFolio !== undefined)) {
    assert.equal(link.printedFolio, finalDestinations[link.targetId]?.page, `Printed route folio mismatch: ${link.label}`);
  }
  const finalFacing = hasPrototype ? facingPlacement(proof, [...choiceHeadings, firstResultHeading]) : null;
  assert.ok(!finalFacing || finalFacing.onFacingSpread, 'Final print labels must preserve the real A/B spread');
  const links = contentsLinks(proof).slice(0, tocEntries.length);
  const contents = tocEntries.map((entry, index) => {
    const link = links[index];
    assert.equal(link.destination.page, numbers[entry.id], entry.title);
    assert.equal(normalize(link.label), normalize(entry.title + String(numbers[entry.id])),
      `Printed contents label or page number differs: ${entry.title}`);
    const page = proof.pages[link.destination.page - 1];
    const chapter = files.get(entry.file);
    const heading = entry.nested ? [...chapter.headings.values()].find(heading => heading.id === entry.id).title : chapter.title;
    assert.ok(normalize(page.text).includes(normalize(heading)), `Contents points to wrong chapter page: ${heading}`);
    return { ...entry, actualHeading: heading, printed: numbers[entry.id], tocPage: link.onPage,
      annotationPage: link.destination.page, annotationLabel: link.label, startY: link.destination.y };
  });

  const figures = [];
  if (files.has('02-browser-foundations.md')) {
    const graph = proof.pages.find(page => page.text.includes('合成与呈现画面'));
    assert.ok(graph && normalize(graph.text).includes('可以用一张依赖图') &&
      normalize(graph.text).includes('箭头表示这些工作的依赖') &&
      normalize(graph.text).includes('标题怎样出现在屏幕上'), 'F01 diagram, title, lead and explanation must share a page');
    figures.push({ kind: 'browser-dependencies', page: graph.page });
  }
  if (enrolment && body.includes('图示：一次成功的报名')) {
    const graph = proof.pages.find(page => normalize(page.text).includes(normalize('图示：一次成功的报名')));
    assert.ok(graph, 'The approved enrolment diagram caption must be physically printed');
    figures.push({ kind: 'enrolment-overview', page: graph.page });
  }

  const chapters = [];
  for (const entry of files.values()) {
    const start = numbers[entry.id];
    const entryPages = proof.pages.slice(start - 1);
    let joined = '';
    const matched = entryPages.find(page => {
      joined += normalize(page.text.replace(new RegExp(`\\s*${page.page} / ${proof.pageCount}\\s*$`), ''));
      return joined.includes(entry.lastText);
    });
    assert.ok(matched, `Missing chapter ending or text extraction mismatch: ${entry.file} (${entry.lastText})`);
    const part = selected.find(group => group.key === entry.part);
    const label = part.number && part.entries[0] === entry ? part.title : null;
    const openingParagraph = entry.tree.children.slice(1).find(node => node.type === 'paragraph');
    chapters.push({ file: entry.file, sha256: entry.sha256, title: entry.title, part: entry.part,
      openingPartLabel: label, openingExcerpt: openingParagraph ? normalize(text(openingParagraph)).slice(0, 24) : '',
      han: entry.han, nonWhitespace: entry.nonWhitespace, start, end: matched.page });
  }
  const computedParts = selected.map(part => {
    const entries = chapters.filter(chapter => chapter.part === part.key);
    const start = entries[0].start, end = entries.at(-1).end;
    return { key: part.key, title: part.title, start, end, span: end - start + 1,
      chapters: entries.length,
      han: entries.reduce((sum, chapter) => sum + chapter.han, 0),
      nonWhitespace: entries.reduce((sum, chapter) => sum + chapter.nonWhitespace, 0) };
  });
  const sourceDrift = [];
  if (sha256(await readFile(path.join(root, 'README.md'))) !== sha256(indexBytes)) sourceDrift.push('README.md');
  for (const chapter of chapters) {
    if (sha256(await readFile(path.join(root, chapter.file))) !== chapter.sha256) sourceDrift.push(chapter.file);
  }
  const sha = sha256(await readFile(path.join(output, pdfName)));
  const summary = { proof: values.stage, pagination: 'chapter', source: path.relative(repo, root), sourceIndexSha256: sha256(indexBytes), orderedSourceSha256,
    totalPages: proof.pageCount, pageSize: 'A5', frontMatterPages: chapters[0].start - 1,
    pageSizePt: [proof.pages[0].widthPt, proof.pages[0].heightPt], allFootersValid: proof.pages.every(page => page.footerValid),
    pdfSha256: sha, browser: browser.version(), measured, figures, chapterCount: chapters.length, contents, chapters,
    parts: computedParts, sourceDrift, prototypeSpread: finalFacing, internalLinks, ignoredIndexLinks, assets: [...assetInfo.values()] };
  await json('source-map.json', summary);
  console.log(JSON.stringify({ output, pages: proof.pageCount, frontMatterPages: summary.frontMatterPages, contents: contents.length,
    chapters: chapters.length, sha, computedParts, measured }));
  assert.ok(summary.allFootersValid, 'Every printed physical page needs the correct footer');
  assert.equal(measured.conflicts.length, 0, `Print width conflicts: ${JSON.stringify(measured.conflicts)}`);
  assert.equal(sourceDrift.length, 0, 'The live manuscript changed during this build');
  const textAudit = await execFile(process.execPath, [path.join(here, 'audit-prose.mjs'), output]);
  await write('prose-audit.json', textAudit.stdout);
  assert.equal(JSON.parse(textAudit.stdout).unmatchedCount, 0, 'Final proof must retain ordered manuscript text');
} finally {
  await browser.close();
}
await execFile(process.execPath, [path.join(here, 'audit-chapter-starts.mjs'), output]);
