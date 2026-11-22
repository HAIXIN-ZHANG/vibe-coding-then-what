export const prototypeFile = 'p2-one-less-click.md';
export const choiceHeadings = ['甲版列表', '乙版列表'];
export const firstResultHeading = '纸一';
export const introductionHeading = '桌上先放三张白纸';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function wrapPrototypePanel(html, startsNewPage = true) {
  return `<div class="prototype-panel prototype-choice${startsNewPage ? ' prototype-new-page' : ''}">${html}</div>`;
}

export function paperReference(heading, page, combinePaper = false) {
  const prefix = combinePaper ? escape(heading) + ' · ' : '';
  const suffix = combinePaper ? '' : ' · ' + escape(heading);
  return `<span class="paper-reference">〔${prefix}第<span class="paper-folio">${page}</span>页${suffix}〕</span>`;
}

export function facingPlacement(proof, headings) {
  const flatten = entries => entries.flatMap(entry => [entry, ...flatten(entry.children)]);
  const outline = flatten(proof.outline);
  const pages = headings.map(heading => {
    const matches = outline.filter(row => row.label === heading);
    if (matches.length !== 1) throw new Error(`Expected one native bookmark for ${heading}, observed ${matches.length}`);
    return matches[0].page;
  });
  const [left, right, firstResult] = pages;
  return { left, right, firstResult, onFacingSpread: left % 2 === 0 && right === left + 1 && firstResult === right + 1 };
}
