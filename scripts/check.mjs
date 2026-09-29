import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = ["index.html", "index_new.html", "register.html", "media.html"];
const documents = new Map(await Promise.all(files.map(async file => [file, await readFile(resolve(root, file), "utf8")])));
for (const [file, html] of documents) {
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: exactly one h1`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: unique IDs`);
  for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:)/.test(reference)) continue;
    const [path, hash] = reference.split("#");
    await access(resolve(root, path || file));
    if (hash) {
      const target = documents.get(path || file);
      assert(target?.includes(`id="${hash}"`), `${file}: missing anchor ${reference}`);
    }
  }
  for (const [, id] of html.matchAll(/\bfor="([^"]+)"/g)) assert(ids.includes(id), `${file}: unmatched label ${id}`);
}
const normalizeBody = html => html.split("<body>")[1].split("</body>")[0]
  .replace(/<(\/)?(?:header|nav|main|aside|section|article|footer)(?=[\s>])/g, "<$1div")
  .replace(/<time datetime="[^"]+">/g, "<span>").replace(/<\/time>/g, "</span>");
assert.equal(normalizeBody(documents.get("index.html")), normalizeBody(documents.get("index_new.html")), "Semantic refactor must preserve body content, attributes and layout classes");
for (const tag of ["header", "nav", "main", "aside", "section", "article", "footer", "time"]) assert(documents.get("index_new.html").includes(`<${tag}`), `Missing ${tag}`);
const css = await readFile(resolve(root, "css/style.css"), "utf8");
for (const [, resource] of css.matchAll(/url\("([^"]+)"\)/g)) await access(resolve(root, "css", resource));
assert((await readFile(resolve(root, "media/green-tech-intro.webm"))).length > 1000);
assert.equal((await readFile(resolve(root, "media/green-tech-podcast.wav"))).subarray(0, 4).toString(), "RIFF");
console.log("PASS: local assets and links, IDs and labels, HTML5 structure, media files, and identical home/semantic content.");
