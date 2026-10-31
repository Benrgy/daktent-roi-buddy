import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import NotFound from "@/pages/NotFound";
import { MemoryRouter } from "react-router-dom";
import { useRouteSeo } from "./useRouteSeo";

afterEach(cleanup);

function SeoPage({ path }: { path: string }) {
  useRouteSeo(path);
  return null;
}

it.each([
  { path: "/daktent-huren-of-kopen", count: 4, question: "Wanneer is kopen goedkoper dan huren?" },
  { path: "/peter-penthouse-daktent", count: 7, question: "Wat kost de Peter Penthouse daktent?" },
])("provides the existing FAQ schema for $path", ({ path, count, question }) => {
  const view = render(<SeoPage path={path} />);
  const schema = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
    .map(script => JSON.parse(script.textContent || "{}"))
    .find(data => data["@type"] === "FAQPage");
  expect(schema.mainEntity).toHaveLength(count);
  expect(schema.mainEntity[0].name).toBe(question);
  expect(schema.mainEntity[0].acceptedAnswer.text.length).toBeGreaterThan(0);
  view.unmount();
  expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull();
});

it("marks unknown routes noindex and restores the previous policy on exit", () => {
  const robots = document.createElement("meta");
  robots.name = "robots";
  robots.content = "index, follow";
  document.head.appendChild(robots);
  const view = render(<MemoryRouter initialEntries={["/unknown"]}><NotFound /></MemoryRouter>);
  expect(robots.content).toBe("noindex");
  view.unmount();
  expect(robots.content).toBe("index, follow");
  robots.remove();
});