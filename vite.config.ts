import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { SITE_URL, routesMeta, type RouteMeta } from "./src/seo/routesMeta";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);

const schemaPattern = /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;

function validateRouteHtml(html: string, route: RouteMeta) {
  const canonicalTags = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi) ?? [];
  if (route.canonical !== `${SITE_URL}${route.path}` || canonicalTags.length !== 1 ||
    !canonicalTags[0].includes(`href="${escapeHtml(route.canonical)}"`)) {
    throw new Error(`Missing or invalid route canonical: ${route.path}`);
  }
  const schemas = [...html.matchAll(schemaPattern)].flatMap(match => {
    const data = JSON.parse(match[1]);
    return Array.isArray(data) ? data : data["@graph"] ?? [data];
  });
  if (route.path === "/") {
    if (!schemas.some(schema => schema["@type"] === "WebApplication" && schema.url === route.canonical)) {
      throw new Error(`Missing route JSON-LD: ${route.path}`);
    }
  } else {
    const page = schemas.find(schema => schema["@type"] === "WebPage" && schema.url === route.canonical);
    const breadcrumb = schemas.find(schema => schema["@type"] === "BreadcrumbList");
    if (!page || page.name !== route.title || page.description !== route.description || page.inLanguage !== "nl" ||
      page.isPartOf?.url !== `${SITE_URL}/` || breadcrumb?.itemListElement?.[0]?.item !== `${SITE_URL}/` ||
      breadcrumb?.itemListElement?.[1]?.item !== route.canonical || schemas.some(schema => schema["@type"] === "WebApplication")) {
      throw new Error(`Missing or invalid route JSON-LD: ${route.path}`);
    }
  }
}

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
  if (route.path !== "/") {
    html = html.replace(schemaPattern, (original, json: string) => {
      const data = JSON.parse(json);
      if (data["@type"] !== "WebApplication" || data.url !== `${SITE_URL}/`) return original;
      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", name: route.title, url: route.canonical, description: route.description, inLanguage: "nl",
            isPartOf: { "@type": "WebSite", name: "Daktent ROI Calculator", url: `${SITE_URL}/` } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: route.h1, item: route.canonical },
          ] },
        ],
      };
      return `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
    });
  }
  const links = routesMeta.filter(other => other.path !== route.path).map(other => `<a href="${escapeHtml(other.path)}">${escapeHtml(other.h1)}</a>`).join("\n");
  const sections = (route.staticSections ?? []).map(section => `<h2>${escapeHtml(section.heading)}</h2>\n<p>${escapeHtml(section.text)}</p>`).join("\n");
  const block = `<header><a href="/">Daktent ROI Calculator</a></header>\n<h1>${escapeHtml(route.h1)}</h1>\n<p>${escapeHtml(route.summary)}</p>\n${sections}\n<nav aria-label="Andere pagina’s">\n${links}\n</nav>`;
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
        validateRouteHtml(writtenHtml, route);
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
