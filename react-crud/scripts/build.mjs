import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const development = process.argv.includes('--development');
const outdir = development ? resolve(root, '../.local/react-crud/dev') : resolve(root, 'assets');
await build({
  entryPoints: [resolve(root, 'src/main.jsx')],
  bundle: true,
  outdir,
  entryNames: 'app',
  minify: !development,
  sourcemap: development ? 'inline' : false,
  define: { 'process.env.NODE_ENV': JSON.stringify(development ? 'development' : 'production') },
  target: ['es2020'],
  legalComments: 'linked',
  logLevel: 'info',
});
if (development) {
  await mkdir(outdir, { recursive: true });
  await writeFile(resolve(outdir, 'index.html'), '<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>React CRUD development</title><link rel="stylesheet" href="app.css"><div id="root"></div><script src="app.js"></script></html>');
}
