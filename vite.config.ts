import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { routesMeta, type RouteMeta } from "./src/seo/routesMeta";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);

function renderRouteHtml(template: string, route: RouteMeta) {
  let html = template.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(route.title)}</title>`);
  const tags = [
    ["name", "description", route.description],
    ["property", "og:url", route.canonical],
    ["property", "og:title", route.title],
    ["property", "og:description", route.description],
    ["name", "twitter:title", route.title],
    ["name", "twitter:description", route.description],
  ];
  for (const [attribute, key, value] of tags) {
    const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`, "gi");
    html = html.replace(pattern, () => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  html = html.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi, () => `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`);
  const links = routesMeta.filter(other => other.path !== route.path).map(other => `<a href="${escapeHtml(other.path)}">${escapeHtml(other.h1)}</a>`).join("\n");
  const block = `<header><a href="/">Daktent ROI Calculator</a></header>\n<h1>${escapeHtml(route.h1)}</h1>\n<p>${escapeHtml(route.summary)}</p>\n<nav aria-label="Andere pagina’s">\n${links}\n</nav>`;
  if (!/<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html)) throw new Error("Expected empty React root in build HTML");
  return html.replace(/<div\s+id=["']root["']\s*>\s*<\/div>/i, () => `<div id="root">\n${block}\n</div>`);
}

function staticRoutePages() {
  let outputDirectory = "";
  return {
    name: "static-route-pages",
    apply: "build" as const,
    configResolved(config: import("vite").ResolvedConfig) {
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
      for (const route of routesMeta) {
        const directory = path.join(outputDirectory, route.path.slice(1));
        await mkdir(directory, { recursive: true });
        const filename = path.join(directory, "index.html");
        const expectedHtml = renderRouteHtml(template, route);
        await writeFile(filename, expectedHtml);
        // Fail the build if any generated route file is missing or incomplete.
        const writtenHtml = await readFile(filename, "utf8");
        if (writtenHtml !== expectedHtml ||
          !writtenHtml.includes(`<title>${escapeHtml(route.title)}</title>`) ||
          !writtenHtml.includes(`<link rel="canonical" href="${escapeHtml(route.canonical)}" />`) ||
          !writtenHtml.includes(`<h1>${escapeHtml(route.h1)}</h1>`)) {
          throw new Error(`Invalid static route HTML: ${filename}`);
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), staticRoutePages()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
