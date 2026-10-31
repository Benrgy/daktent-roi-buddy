import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import NotFound from "@/pages/NotFound";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

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