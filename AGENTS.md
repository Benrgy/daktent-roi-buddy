# Architecture rules
- Keep the rental-versus-purchase calculation as a pure function in `src/lib/hurenOfKopen.ts`, separate from the existing ROI calculator, so the two models do not affect each other.
- Store attributed rental and purchase example prices in `src/data/prijzen.ts` and import them into the relevant articles, so examples share one source of truth.
- Keep public route SEO in `src/seo/routesMeta.ts`, consumed by the client SEO hook and the build-only Vite static-route plugin, so crawler HTML and browser metadata share one source without changing React rendering.