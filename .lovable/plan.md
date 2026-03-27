

## Probleem: Wit scherm op custom domein (GitHub Pages)

Je site wordt gehost via **GitHub Pages**, maar je ziet een wit scherm op `daktentroicalculator.online`. Dit komt waarschijnlijk door een combinatie van deze problemen:

### Oorzaak 1: Geen `404.html` voor SPA routing
GitHub Pages stuurt een 404 bij elke URL die geen bestaand bestand is. React Router heeft een `404.html` nodig die doorverwijst naar `index.html`.

### Oorzaak 2: Mogelijk verkeerde base path of build-configuratie
De Vite config heeft geen `base` ingesteld — dit is correct voor een custom domein (standaard `/`), dus dit zou goed moeten zijn.

### Oorzaak 3: GitHub Pages deployment
Als je via Lovable's GitHub sync werkt, wordt de code naar GitHub gepusht maar **niet automatisch gebuild voor GitHub Pages**. Je hebt een GitHub Actions workflow nodig die `npm run build` draait en de `dist/` folder deployt.

---

## Plan

### Stap 1: Voeg een GitHub Actions workflow toe voor automatische deployment
Maak `.github/workflows/deploy.yml` aan die:
- Triggered op push naar `main`
- `npm install` + `npm run build` draait
- De `dist/` folder deployt naar GitHub Pages

### Stap 2: Voeg `404.html` toe voor SPA support
Kopieer `index.html` als `public/404.html` zodat GitHub Pages bij elke route de React app laadt in plaats van een 404.

### Stap 3: CNAME in public folder
Verplaats het `CNAME` bestand naar de `public/` folder zodat het meekomt in de build output (`dist/`).

---

## Alternatief: Gebruik Lovable's eigen hosting

Je kunt ook gewoon Lovable's ingebouwde hosting gebruiken met je custom domein. Ga naar **Project Settings → Domains → Connect Domain** en volg de stappen. Dan hoef je geen GitHub Pages setup te doen. Dit is eenvoudiger en werkt direct.

**DNS instelling voor Lovable hosting:**
- A record `@` → `185.158.133.1`
- A record `www` → `185.158.133.1`
- TXT record `_lovable` → de verificatiecode die Lovable geeft

---

## Aanbeveling

**Gebruik Lovable's eigen hosting** — dit is veel eenvoudiger dan GitHub Pages en werkt out-of-the-box met je custom domein. Als je toch GitHub Pages wilt gebruiken, implementeer ik stap 1-3.

