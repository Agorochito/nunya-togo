// Contrôle des en-têtes de sécurité déclarés dans vercel.json (5.28.2).
// Chaque page HTML publiée doit refuser d'être encadrée par un autre site (CSP frame-ancestors + X-Frame-Options),
// la politique d'en-tête de l'accueil doit rester celle de la balise meta, et deux règles ne doivent jamais
// fixer le même en-tête pour un même fichier : l'ordre de priorité de Vercel n'aurait alors plus d'importance.
import fs from 'node:fs/promises';
import path from 'node:path';

const config = JSON.parse(await fs.readFile('vercel.json', 'utf8'));
const errors = [];

const sourceRegex = source => {
  let out = '', depth = 0;
  for (const ch of source) {
    if (ch === '(') depth++;
    out += depth ? ch : ch.replace(/[.*+?^${}|[\]\\/]/g, '\\$&');
    if (ch === ')') depth--;
  }
  return new RegExp('^' + out + '$');
};
const rules = config.headers.map(rule => ({ source: rule.source, rx: sourceRegex(rule.source), headers: rule.headers }));

const headersFor = url => {
  const found = {}, owner = {};
  for (const rule of rules) {
    if (!rule.rx.test(url)) continue;
    for (const { key, value } of rule.headers) {
      const k = key.toLowerCase();
      if (owner[k]) errors.push(`${url} : « ${key} » est fixé par ${owner[k]} et par ${rule.source}`);
      owner[k] = rule.source;
      found[k] = value;
    }
  }
  return found;
};

const walk = async dir => (await Promise.all((await fs.readdir(dir, { withFileTypes: true })).map(entry => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
}))).flat();

const files = (await walk('dist')).map(file => '/' + path.relative('dist', file).split(path.sep).join('/'));
for (const url of files) headersFor(url);

const pages = files.filter(url => url.endsWith('.html'));
for (const url of [...pages, '/']) {
  const h = headersFor(url);
  const csp = h['content-security-policy'] || '';
  if (!/(?:^|;)\s*frame-ancestors\s+'self'\s*(?:;|$)/.test(csp)) errors.push(`${url} : CSP sans « frame-ancestors 'self' »`);
  if (h['x-frame-options'] !== 'SAMEORIGIN') errors.push(`${url} : X-Frame-Options doit valoir SAMEORIGIN`);
}

// Une URL encodée (/index%2Ehtml, /runtime/dom%2Dframe.html) n'est couverte que par la règle générale :
// c'est elle qui doit porter X-Frame-Options, pas seulement les règles propres à chaque page.
const catchAll = rules.find(rule => rule.source === '/(.*)');
if (catchAll?.headers.find(h => h.key.toLowerCase() === 'x-frame-options')?.value !== 'SAMEORIGIN')
  errors.push("/(.*) : la règle générale doit fixer X-Frame-Options: SAMEORIGIN (seule protection des URL encodées)");

const meta = (await fs.readFile('dist/index.html', 'utf8')).match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
if (!meta) errors.push('dist/index.html : balise meta CSP introuvable');
for (const url of ['/', '/index.html']) {
  if (meta && headersFor(url)['content-security-policy'] !== meta + "; frame-ancestors 'self'")
    errors.push(`${url} : la CSP d'en-tête doit être la CSP meta suivie de « ; frame-ancestors 'self' »`);
}

for (const url of ['/runtime/dom-frame.html', '/runtime/react-frame.html']) {
  if (!/(?:^|;)\s*sandbox\s+allow-scripts\s*(?:;|$)/.test(headersFor(url)['content-security-policy'] || ''))
    errors.push(`${url} : la CSP doit garder « sandbox allow-scripts » (vérifiée par interactive-client)`);
}
for (const url of files.filter(url => /^\/coding-[a-z]+-worker\.js$/.test(url) && url !== '/coding-python-worker.js')) {
  if (!headersFor(url)['content-security-policy']) errors.push(`${url} : worker sans CSP`);
}

if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ files: files.length, pages: pages.length + 1, rules: rules.length, errors: 0 }));
