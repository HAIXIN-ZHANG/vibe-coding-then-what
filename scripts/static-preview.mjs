import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseBasePath } from '../site/config/deployment.ts';

const output = fileURLToPath(new URL('../site/out/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Local test tooling only: never serve the repository, list directories or follow escaping symlinks.
export async function createStaticPreview({ directory = output, basePath = '', port = 4179 } = {}) {
  const prefix = parseBasePath(basePath);
  const root = await realpath(directory);
  const inside = candidate => candidate.startsWith(`${root}${path.sep}`);
  const initial = await Promise.all(['index.html', '404.html'].map(async name => {
    const target = await realpath(path.join(root, name));
    if (!inside(target) || !(await stat(target)).isFile()) throw new Error(`Invalid static export: ${name}`);
    return readFile(target);
  }));
  const fallback = initial[1];

  async function serve(request, response) {
    const send = (status, body, contentType = types['.html'], extra = {}) => {
      response.writeHead(status, { 'Content-Type': contentType, 'Content-Length': body.length, 'Cache-Control': 'no-store', ...extra });
      response.end(request.method === 'HEAD' ? undefined : body);
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') return send(405, fallback, types['.html'], { Allow: 'GET, HEAD' });
    const raw = (request.url || '/').split('?')[0];
    let decoded;
    try { decoded = decodeURIComponent(raw); } catch { return send(400, fallback); }
    if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.includes('\\') ||
      [...decoded].some(character => character.charCodeAt(0) <= 31 || character.charCodeAt(0) === 127) ||
      decoded.split('/').some(segment => segment === '.' || segment === '..')) return send(400, fallback);
    if (prefix && decoded === prefix) return send(308, fallback, types['.html'], { Location: `${prefix}/` });
    if (prefix && !decoded.startsWith(`${prefix}/`)) return send(404, fallback);
    const pathname = decoded.slice(prefix.length);
    let target = path.resolve(root, `.${pathname}`);
    if (!inside(target) && target !== root) return send(404, fallback);
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      target = await realpath(target);
      if (!inside(target) || !(await stat(target)).isFile()) return send(404, fallback);
      return send(200, await readFile(target), types[path.extname(target)] || 'application/octet-stream');
    } catch (error) {
      if (['ENOENT', 'ENOTDIR', 'EACCES'].includes(error.code)) return send(404, fallback);
      throw error;
    }
  }

  const server = createServer((request, response) => {
    void serve(request, response).catch(error => {
      console.error(error);
      if (!response.headersSent) response.writeHead(500);
      response.end();
    });
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await createStaticPreview({ basePath: process.env.NEXT_PUBLIC_BASE_PATH });
  console.log(`Static export preview: http://127.0.0.1:4179${parseBasePath(process.env.NEXT_PUBLIC_BASE_PATH)}/`);
  process.once('SIGTERM', () => server.close());
  process.once('SIGINT', () => server.close());
}
