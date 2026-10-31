import { describe, expect, it } from "vitest";
import { getRouteMeta, routesMeta } from "./routesMeta";

describe("public route identities", () => {
  it.each(["/", "/daktent-vs-hotel", "/daktent-vs-camper", "/peter-penthouse-daktent", "/daktent-huren-of-kopen"])("uses its own canonical for %s", path => {
    expect(getRouteMeta(path).canonical).toBe(`https://daktentroicalculator.online${path}`);
  });
  it("contains exactly the five public routes", () => {
    expect(routesMeta).toHaveLength(5);
    expect(new Set(routesMeta.map(route => route.path)).size).toBe(5);
  });
});