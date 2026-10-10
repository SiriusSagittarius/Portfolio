// Nach `ng build`: In den vorgerenderten HTML-Seiten wird das Angular-JS erst
// geladen, wenn die Seite fertig geladen ist (load-Event, dann Browser-Leerlauf).
// Inhalt und LCP-Bild bekommen so zuerst die volle Bandbreite; Klicks vor der
// Hydration spielt Angulars Event-Replay nach.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = 'dist/portfolio/browser';

const loader = (main) =>
  [
    `const load=()=>import("./${main}");`,
    `const idle=()=>"requestIdleCallback"in window?requestIdleCallback(load,{timeout:2000}):setTimeout(load,200);`,
    `document.readyState==="complete"?idle():addEventListener("load",idle,{once:true});`,
  ].join('');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

for (const file of htmlFiles(OUT_DIR)) {
  const html = readFileSync(file, 'utf8');
  const result = html
    .replace(/<link rel="modulepreload" href="[^"]+">/g, '')
    .replace(
      /<script src="(main-[A-Z0-9]+\.js)" type="module"><\/script>/,
      (_, main) => `<script type="module">${loader(main)}</script>`,
    );
  if (result !== html) {
    writeFileSync(file, result);
    console.log(`postbuild: JS nach dem load-Event in ${file}`);
  }
}
