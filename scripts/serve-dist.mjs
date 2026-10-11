// Lokaler Server fuer den Production-Build (dist/portfolio/browser), der sich
// wie der Apache-Host mit der .htaccess verhaelt: gzip, Cache-Header,
// vorgerenderte Seiten (/imprint -> imprint/index.html) und 404 fuer fehlende
// Dateien. Gedacht zum Testen mit Lighthouse – `ng serve` ist dafuer ungeeignet.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT = resolve('dist/portfolio/browser');
const PORT = Number(process.env.PORT) || 4400;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};
const COMPRESSIBLE = /^(text\/|application\/(javascript|json)|image\/svg)/;

if (!existsSync(ROOT)) {
  console.error('Kein Build gefunden – zuerst `npm run build` ausfuehren.');
  process.exit(1);
}

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = join(ROOT, urlPath);
  if (existsSync(join(file, 'index.html'))) file = join(file, 'index.html');

  if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) {
    if (urlPath.startsWith('/.well-known/') || /\.[a-zA-Z0-9]+$/.test(urlPath)) {
      res.writeHead(404);
      return res.end();
    }
    file = join(ROOT, 'index.html');
  }

  const type = TYPES[extname(file)] || 'application/octet-stream';
  const hashed = /-[A-Z0-9]{8}\.(js|css|woff2|webp|svg)$/.test(file);
  const headers = {
    'Content-Type': type,
    'Cache-Control': hashed ? 'public, max-age=31536000, immutable' : 'no-cache',
  };
  let body = readFileSync(file);
  if (COMPRESSIBLE.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')) {
    body = gzipSync(body);
    headers['Content-Encoding'] = 'gzip';
  }
  res.writeHead(200, headers);
  res.end(body);
}).listen(PORT, () => console.log(`Production-Build laeuft auf http://localhost:${PORT}`));
