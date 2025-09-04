/* Simple copy of index.html and public/* into dist */
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const pub = path.resolve(__dirname, '..', 'public');
const indexSrc = path.resolve(__dirname, '..', 'index.html');

fs.mkdirSync(dist, { recursive: true });

// copy index.html and 404.html (SPA fallback for GH Pages)
const indexDst = path.join(dist, 'index.html');
fs.copyFileSync(indexSrc, indexDst);
// also duplicate as 404.html to help GH Pages serve SPA
fs.copyFileSync(indexSrc, path.join(dist, '404.html'));

// copy public dir contents to dist
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    const d = path.join(dst, f);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir(pub, dist);
console.log('Static copied to dist');
