import { useEffect } from "react";
import { getRouteMeta, getFaqSchema } from "./routesMeta";

export function useRouteSeo(path: string) {
  const route = getRouteMeta(path);
  useEffect(() => {
    const previousTitle = document.title;
    const restore: (() => void)[] = [];
    document.title = route.title;
    const setTag = (selector: string, tag: "meta" | "link", identity: Record<string, string>, attribute: string, value: string) => {
      let element = document.head.querySelector(selector);
      const existed = Boolean(element);
      const previous = element?.getAttribute(attribute);
      if (!element) {
        element = document.createElement(tag);
        Object.entries(identity).forEach(([key, content]) => element?.setAttribute(key, content));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
      const current = element;
      restore.push(() => {
        if (!existed) current.remove();
        else if (previous === null || previous === undefined) current.removeAttribute(attribute);
        else current.setAttribute(attribute, previous);
      });
    };
    setTag('meta[name="description"]', "meta", { name: "description" }, "content", route.description);
    setTag('link[rel="canonical"]', "link", { rel: "canonical" }, "href", route.canonical);
    for (const [property, value] of Object.entries({ "og:url": route.canonical, "og:title": route.title, "og:description": route.description })) {
      setTag(`meta[property="${property}"]`, "meta", { property }, "content", value);
    }
    for (const [name, value] of Object.entries({ "twitter:title": route.title, "twitter:description": route.description })) {
      setTag(`meta[name="${name}"]`, "meta", { name }, "content", value);
    }
    const faq = getFaqSchema(route);
    if (faq) {
      const existingFaq = [...document.head.querySelectorAll('script[type="application/ld+json"]')].some(script => {
        try { const data = JSON.parse(script.textContent || "{}"); const schemas = Array.isArray(data) ? data : data["@graph"] ?? [data]; return schemas.some((schema: { "@type": string; mainEntity?: unknown }) => schema["@type"] === "FAQPage" && JSON.stringify(schema.mainEntity) === JSON.stringify(faq.mainEntity)); } catch { return false; }
      });
      if (!existingFaq) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(faq);
        document.head.appendChild(script);
        restore.push(() => script.remove());
      }
    }
    return () => {
      document.title = previousTitle;
      restore.reverse().forEach(cleanup => cleanup());
    };
  }, [route]);
  return route;
}