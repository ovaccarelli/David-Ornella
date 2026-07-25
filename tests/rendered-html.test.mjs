import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the wedding site and its primary sections", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>David &amp; Ornella — 17 luglio 2027<\/title>/i);
  assert.match(html, /David/);
  assert.match(html, /Ornella/);
  assert.doesNotMatch(html, /id="storia"|La nostra storia/);
  assert.match(html, /id="giornata"/);
  assert.match(html, /Chiesetta San Michele Arcangelo/);
  assert.match(html, /Orario da definire/);
  assert.match(html, /id="luogo"/);
  assert.match(html, /id="rsvp"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});
