

# Peter Penthouse Strategische Integratie

## Wat we bouwen

Diepere, psychologisch sterke Peter Penthouse productintegratie door de hele site — gebaseerd op de echte website-content en USP's. Geen aparte productpagina, maar slimme plaatsing op conversie-momenten.

## Wijzigingen

### 1. Nieuw component: `PeterPenthouseSpotlight.tsx`
Visueel rijke productkaart die verschijnt op de homepage tussen de calculator resultaten en "Waarom een daktent?" sectie. Bevat:
- **Origin story**: "Fabrieksbezoeken in China, geen compromissen" — kort en persoonlijk
- **4 USP-blokken** met iconen: Off-grid elektra (60W solar + 20.000mAh), Premium matras (6cm, 3cm memory foam), Compleet pakket (geen upsells), Compact maar ruim (2 panoramische dakramen)
- **Prijsanker**: "€2.495 — compleet" vs "Premium merken vanaf €3.500+"
- **CTA-knop** naar peter-penthouse.com/?ref=calculator
- Tagline van hun site: "Combineer het gemak van een auto met het comfort van een camper"

### 2. Verbeterde affiliate CTA in `ResultsSection.tsx`
De bestaande simpele CTA (regel 281-299) wordt uitgebreid met:
- Dynamische tekst op basis van besparing ("Je bespaart €X — investeer slim")
- Volledige USP-lijst: solar panel, premium matras, off-grid, compleet pakket
- Visueel aantrekkelijker met gradient border en hover-effect
- "Loss aversion" element: "Elke nacht zonder daktent kost je €X"

### 3. Verbeterde `SmartInsight` in ResultsSection
Peter Penthouse insight (regel 81-91) uitbreiden met:
- Specifiekere besparingsberekening: zonnepaneel €150/jaar + compact ontwerp = 8% minder brandstof
- Link naar productpagina in de insight tekst

### 4. SEO-pagina's: Verdict sectie
In zowel `DaktentVsHotel.tsx` als `DaktentVsCamper.tsx` bij het eindoordeel een "Onze aanbeveling" toevoegen met Peter Penthouse als productvermelding, inclusief de kern-USP's.

### 5. `WhyRooftopTent.tsx`: Subtiele verwijzing
De "60 Sec Opzetten" kaart bijwerken met een subtiele Peter Penthouse verwijzing: "Zoals de Peter Penthouse: klap open en slaap — inclusief zonnepaneel en premium matras."

### 6. Footer CTA verbeteren
De bestaande footer-knop (Index.tsx regel 303-309) uitbreiden met de tagline en een korte USP-rij.

## Bestanden

| Bestand | Actie |
|---|---|
| `src/components/calculator/PeterPenthouseSpotlight.tsx` | Nieuw |
| `src/components/calculator/ResultsSection.tsx` | Affiliate CTA + SmartInsight verbeteren |
| `src/components/calculator/WhyRooftopTent.tsx` | Subtiele productverwijzing |
| `src/pages/Index.tsx` | Spotlight component toevoegen + footer CTA |
| `src/pages/DaktentVsHotel.tsx` | Productvermelding in verdict |
| `src/pages/DaktentVsCamper.tsx` | Productvermelding in verdict |

## Psychologische technieken

- **Anchoring**: €2.495 naast €3.500+ premium alternatieven
- **Loss aversion**: "Elke hotelnacht kost je €X meer"
- **Social proof**: "Steeds populairder onder Nederlandse reizigers"
- **Completeness bias**: "Alles inbegrepen — geen verborgen kosten"
- **Origin story**: Persoonlijk verhaal = vertrouwen en gunfactor
- **Specificity**: Exacte specs (320 GSM, 6cm matras, 60W paneel) verhogen geloofwaardigheid

