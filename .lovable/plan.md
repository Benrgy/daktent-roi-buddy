

# Prijzen updaten naar actuele Peter Penthouse prijzen

## Gevonden op peter-penthouse.com/kopen

| Optie | Prijs |
|-------|-------|
| Verzenden (NL/BE) | **€1.749** |
| Ophalen (Soerendonk) | **€1.599** |

De huidige prijs op de site is overal **€2.495** — dit moet worden bijgewerkt.

## Aanpak

Ik gebruik **€1.749** als standaardprijs (verzendoptie, meest relevant voor online bezoekers). De "vanaf" prijs wordt **€1.599**.

### Bestanden die worden aangepast

1. **`src/components/calculator/InputSection.tsx`**
   - Preset-knop: `tentPrice: 2495` → `1749`
   - Label: "€2.495" → "€1.749"

2. **`src/components/calculator/PeterPenthouseSpotlight.tsx`**
   - Hoofdprijs: "€2.495" → "€1.749"
   - Doorgestreepte vergelijkingsprijs "€3.500+" blijft (premium merken referentie)
   - Toevoegen: "vanaf €1.599 bij ophalen"

3. **`src/components/calculator/ResultsSection.tsx`**
   - `inputs.tentPrice === 2495` → `=== 1749`
   - CTA tekst: "€2.495" → "€1.749"

4. **`src/pages/Index.tsx`**
   - Footer tekst: "vanaf €2.495" → "vanaf €1.599"

5. **`src/pages/DaktentVsHotel.tsx`**
   - Vermelding: "€2.495" → "€1.749"

6. **`src/pages/DaktentVsCamper.tsx`**
   - Vermelding: "€2.495" → "€1.749"

7. **`src/lib/analytics.ts`**
   - `value: 2495` → `value: 1749`

