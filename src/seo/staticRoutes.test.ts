// @vitest-environment node
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, it } from "vitest";
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
      expect(JSON.parse(structuredData ?? "{}").name).toBe("Daktent ROI Calculator");
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});