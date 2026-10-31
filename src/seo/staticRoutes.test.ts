import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, it, vi } from "vitest";
vi.mock("vite", () => ({ defineConfig: (value: unknown) => value }));
vi.mock("@vitejs/plugin-react-swc", () => ({ default: () => ({ name: "react-test" }) }));
vi.mock("lovable-tagger", () => ({ componentTagger: () => ({ name: "tagger-test" }) }));
import config from "../../vite.config";
import { routesMeta } from "./routesMeta";

it("writes all public route files with self-referencing URLs and preserves app loading", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "static-routes-"));
  try {
    const outDir = path.join(directory, "dist");
    await mkdir(outDir);
    const template = await readFile(path.resolve("index.html"), "utf8");
    await writeFile(path.join(outDir, "index.html"), template);
    const resolved = config({ command: "build", mode: "production", isSsrBuild: false, isPreview: false });
    const plugin = resolved.plugins?.flat().find(candidate => candidate && typeof candidate === "object" && "name" in candidate && candidate.name === "static-route-pages");
    if (!plugin || !("configResolved" in plugin) || !("closeBundle" in plugin)) throw new Error("Missing build plugin");
    const configure = plugin.configResolved as (config: unknown) => void;
    const closeBundle = plugin.closeBundle as () => Promise<void>;
    configure({ root: directory, build: { outDir: "dist" } });
    await closeBundle();
    for (const route of routesMeta) {
      const html = await readFile(path.join(outDir, route.path.slice(1), "index.html"), "utf8");
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g) ?? [];
      expect(canonical).toEqual([`<link rel="canonical" href="${route.canonical}"`]);
      expect(html.match(/<meta property="og:url" content="([^"]+)"/)?.[1]).toBe(route.canonical);
      const links = [...html.matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
      expect(links.slice(1).sort()).toEqual(routesMeta.filter(other => other.path !== route.path).map(other => other.path).sort());
      expect(html).toContain('<script type="module" src="/src/main.tsx"></script>');
      const structuredData = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
      const schema = JSON.parse(structuredData ?? "{}");
      if (route.path === "/") {
        expect(schema["@type"]).toBe("WebApplication");
        expect(schema.name).toBe("Daktent ROI Calculator");
        expect(schema.url).toBe("https://daktentroicalculator.online/");
      } else {
        expect(schema["@graph"]).toEqual([
          { "@type": "WebPage", name: route.title, url: route.canonical, description: route.description, inLanguage: "nl",
            isPartOf: { "@type": "WebSite", name: "Daktent ROI Calculator", url: "https://daktentroicalculator.online/" } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://daktentroicalculator.online/" },
            { "@type": "ListItem", position: 2, name: route.h1, item: route.canonical },
          ] },
        ]);
        expect(html).not.toContain('"@type": "WebApplication"');
      }
      const document = new DOMParser().parseFromString(html, "text/html");
      const headings = [...document.querySelectorAll("#root h2")].map(element => element.textContent);
      const paragraphs = [...document.querySelectorAll("#root p")].slice(1).map(element => element.textContent);
      expect(headings).toEqual((route.staticSections ?? []).map(section => section.heading));
      expect(paragraphs).toEqual((route.staticSections ?? []).map(section => section.text));
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

it.each(["canonical", "schema"])("fails the build when the template has no %s", async missing => {
  const directory = await mkdtemp(path.join(tmpdir(), "invalid-static-routes-"));
  try {
    const outDir = path.join(directory, "dist");
    await mkdir(outDir);
    let template = await readFile(path.resolve("index.html"), "utf8");
    template = missing === "canonical"
      ? template.replace(/<link rel="canonical"[^>]*>/, "")
      : template.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
    await writeFile(path.join(outDir, "index.html"), template);
    const resolved = config({ command: "build", mode: "production", isSsrBuild: false, isPreview: false });
    const plugin = resolved.plugins?.flat().find(candidate => candidate && typeof candidate === "object" && "name" in candidate && candidate.name === "static-route-pages");
    if (!plugin || !("configResolved" in plugin) || !("closeBundle" in plugin)) throw new Error("Missing build plugin");
    (plugin.configResolved as (config: unknown) => void)({ root: directory, build: { outDir: "dist" } });
    await expect((plugin.closeBundle as () => Promise<void>)()).rejects.toThrow(missing === "canonical" ? /canonical/ : /JSON-LD/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

it("fails the build when an article route has no homepage schema to replace", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "missing-route-schema-"));
  const homepage = routesMeta.shift();
  try {
    const outDir = path.join(directory, "dist");
    await mkdir(outDir);
    const template = (await readFile(path.resolve("index.html"), "utf8")).replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
    await writeFile(path.join(outDir, "index.html"), template);
    const resolved = config({ command: "build", mode: "production", isSsrBuild: false, isPreview: false });
    const plugin = resolved.plugins?.flat().find(candidate => candidate && typeof candidate === "object" && "name" in candidate && candidate.name === "static-route-pages");
    if (!plugin || !("configResolved" in plugin) || !("closeBundle" in plugin)) throw new Error("Missing build plugin");
    (plugin.configResolved as (config: unknown) => void)({ root: directory, build: { outDir: "dist" } });
    await expect((plugin.closeBundle as () => Promise<void>)()).rejects.toThrow(/JSON-LD: \/daktent-vs-hotel/);
  } finally {
    if (homepage) routesMeta.unshift(homepage);
    await rm(directory, { recursive: true, force: true });
  }
});