import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const buildRoot = resolve(projectRoot, "dist");
const pagesRoot = resolve(projectRoot, "docs");
const repositoryPath = "/David-Ornella";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const environment = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const context = { waitUntil() {}, passThroughOnException() {} };

async function render(route, destination) {
  const response = await worker.fetch(
    new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
    environment,
    context,
  );

  if (!response.ok) throw new Error(`Unable to render ${route}: ${response.status}`);

  const html = (await response.text())
    .replaceAll("/assets/", `${repositoryPath}/assets/`);

  const directory = resolve(pagesRoot, destination);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}

await rm(pagesRoot, { recursive: true, force: true });
await cp(resolve(buildRoot, "client"), pagesRoot, { recursive: true });
await rm(resolve(pagesRoot, ".vite"), { recursive: true, force: true });
await rm(resolve(pagesRoot, ".DS_Store"), { force: true });
await rm(resolve(pagesRoot, ".assetsignore"), { force: true });
await rm(resolve(pagesRoot, "_headers"), { force: true });
await rm(resolve(pagesRoot, "assets", ".DS_Store"), { force: true });
await rm(resolve(pagesRoot, "assets", "images", ".DS_Store"), { force: true });

const stylesheet = (await readdir(resolve(pagesRoot, "assets")))
  .find((file) => file.endsWith(".css"));

if (stylesheet) {
  const stylesheetPath = resolve(pagesRoot, "assets", stylesheet);
  const css = (await readFile(stylesheetPath, "utf8"))
    .replaceAll("/assets/", `${repositoryPath}/assets/`);
  await writeFile(stylesheetPath, css);
}

await render("/", ".");
await render("/regalo", "regalo");
await writeFile(resolve(pagesRoot, ".nojekyll"), "");
await writeFile(resolve(pagesRoot, "404.html"), await readFile(resolve(pagesRoot, "index.html")));
