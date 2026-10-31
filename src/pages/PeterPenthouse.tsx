import { useEffect, useMemo, useState } from "react";
import { trackPeterPenthouseClick } from "@/lib/analytics";
import { calculate, defaultInputs } from "@/lib/calculator";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { ProsCons } from "@/components/article/ProsCons";
import { FAQ } from "@/components/article/FAQ";
import heroImg from "@/assets/hero-bg.jpg";
import { PRICE_PICKUP, PRICE_DELIVERED, CHECKED } from "@/data/prijzen";
import { getRouteMeta } from "@/seo/routesMeta";
import { useRouteSeo } from "@/seo/useRouteSeo";

// Bronprijzen en controledatum staan centraal in data/prijzen.
const YEARS = 5;
const PAGE_URL = getRouteMeta("/peter-penthouse-daktent").canonical;

const tocItems = [
  { id: "intro", label: "Kort antwoord" },
  { id: "prijs", label: "Prijs en levertijd" },
  { id: "pakket", label: "Wat zit erbij" },
  { id: "specificaties", label: "Specificaties" },
  { id: "auto", label: "Past hij op je auto?" },
  { id: "kost-per-nacht", label: "Kost per nacht" },
  { id: "huren", label: "Huren of kopen" },
  { id: "pros-cons", label: "Voordelen & nadelen" },
  { id: "faq", label: "Veelgestelde vragen" },
  { id: "oordeel", label: "Ons oordeel" },
];

const euro = (n: number, decimals = 0) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

function perNight(tentPrice: number, nightsPerYear: number) {
  const inputs = { ...defaultInputs, tentPrice, nightsPerYear, years: YEARS };
  const r = calculate(inputs);
  const nights = nightsPerYear * YEARS;
  const tentOnly = tentPrice + inputs.roofRackPrice + inputs.maintenancePerYear * YEARS;
  return {
    tent: tentOnly / nights,
    allIn: r.totalDaktentCost / nights,
    hotel: r.totalHotelCost / nights,
    breakEven: r.breakEvenTrips,
  };
}

const faqItems = [
  { q: "Wat kost de Peter Penthouse daktent?", a: `${euro(PRICE_PICKUP)} als je hem ophaalt in Soerendonk (Noord-Brabant), ${euro(PRICE_DELIVERED)} met bezorging in Nederland of België (${euro(150)} verzendkosten). Dat is inclusief zonnepaneel, powerbank, matras, ladder en luifel. Prijzen gecontroleerd op ${CHECKED}.` },
  { q: "Hoe zwaar is de Peter Penthouse?", a: "De tent weegt 62 kg, de ladder 3 kg. Tel daar het gewicht van je dakdragers bij op en vergelijk dat met de dynamische daklast van je auto (te vinden in het instructieboekje)." },
  { q: "Hoe groot is de Peter Penthouse?", a: "Uitgeklapt 190 × 230 × 130 cm, ingeklapt 190 × 115 × 25 cm. Uitgeklapt draagt hij volgens de maker 300 kg." },
  { q: "Kun je de Peter Penthouse huren?", a: "De maker verhuurt zelf niet. Daktrail (Helmond en Gilze) verhuurt hem vanaf €25 per dag, met lagere dagprijzen vanaf dag 11 en dag 16. In vakantieperiodes huur je minimaal 7 dagen, daarbuiten minimaal 4." },
  { q: "Zit er een binnentent of voortent bij?", a: "Nee. Er is één model met één pakket, zonder thermo-binnentent of ondertent. De aanritsbare luifel zit er wel bij. De tent is alleen in zwart verkrijgbaar." },
  { q: "Is de Peter Penthouse direct leverbaar?", a: `Niet direct: op ${CHECKED} meldt de maker dat de tenten van dit jaar verkocht zijn en dat een nieuwe bestelling in november of december geleverd wordt. Bezichtigen in Soerendonk kan op afspraak.` },
  { q: "Heb ik dakdragers nodig?", a: "Ja. De tent gaat op dakdragers, niet rechtstreeks op dakrails. De maker adviseert minimaal ongeveer 70 cm tussen de dragers en dragers met 100 kg draagvermogen voor marge." },
];

export default function PeterPenthouse() {
  const seo = useRouteSeo("/peter-penthouse-daktent");
  const [delivered, setDelivered] = useState(true);
  const [nightsPerYear, setNightsPerYear] = useState(20);
  const price = delivered ? PRICE_DELIVERED : PRICE_PICKUP;
  const live = useMemo(() => perNight(price, nightsPerYear), [price, nightsPerYear]);

  useEffect(() => {

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Peter Penthouse daktent: review, prijs en kosten per nacht",
        description: "Prijs, specificaties, huren of kopen en de kosten per nacht van de Peter Penthouse daktent.",
        datePublished: "2026-10-17",
        dateModified: "2026-10-17",
        author: { "@type": "Organization", name: "Daktent ROI Calculator" },
        publisher: { "@type": "Organization", name: "Daktent ROI Calculator" },
        mainEntityOfPage: PAGE_URL,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ]);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Zet de Peter Penthouse-prijs en het gekozen aantal nachten klaar in de calculator op de homepage.
  const openInCalculator = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("daktent-calc-inputs") || "{}");
      localStorage.setItem("daktent-calc-inputs", JSON.stringify({ ...saved, tentPrice: price, nightsPerYear, years: YEARS }));
    } catch {
      // geen opslag beschikbaar: de calculator start dan met de standaardwaarden
    }
  };

  const rows = [10, 20, 30, 50].map((n) => ({ n, d: perNight(PRICE_DELIVERED, n), p: perNight(PRICE_PICKUP, n) }));

  return (
    <ArticleLayout
      title={seo.h1}
      subtitle="Review op papier: prijs, specificaties en wat hij je per nacht kost, uitgerekend met onze calculator."
      heroImage={heroImg}
      heroAlt="Daktent op een auto bij zonsondergang (sfeerbeeld, niet de Peter Penthouse)"
      tocItems={tocItems}
      publishDate="Oktober 2026"
      readTime="7 min"
      breadcrumbLabel="Peter Penthouse daktent"
    >
      <section id="intro">
        <h2>Peter Penthouse daktent in het kort</h2>
        <p>
          <strong>De Peter Penthouse is een semi-hardshell daktent van een kleine Nederlandse verkoper uit Soerendonk. Hij kost {euro(PRICE_PICKUP)} opgehaald of {euro(PRICE_DELIVERED)} bezorgd</strong>, en dat is
          inclusief 60W zonnepaneel, powerbank, 6 cm matras, ladder en luifel. Bij 20 nachten per jaar kost de tent je, met dakdragers en onderhoud erbij, ongeveer {euro(perNight(PRICE_DELIVERED, 20).tent, 2)} per nacht over vijf jaar.
        </p>
        <p className="text-sm">
          Eerlijk vooraf: wij hebben deze tent niet zelf getest. Dit is een review op papier. Alle prijzen en specificaties komen van de maker
          (<a href="https://www.peter-penthouse.com/" target="_blank" rel="noopener noreferrer">peter-penthouse.com</a>) en van verhuurder Daktrail, gecontroleerd op {CHECKED}.
          De kosten per nacht rekenen we uit met de calculator van deze site. De foto bovenaan is een sfeerbeeld; de Peter Penthouse zelf is zwart.
        </p>
      </section>

      <section id="prijs">
        <h2>Wat kost de Peter Penthouse?</h2>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Zo koop je hem</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Prijs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-card">
                <td className="px-4 py-3 text-foreground">Ophalen in Soerendonk (Noord-Brabant)</td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{euro(PRICE_PICKUP)}</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="px-4 py-3 text-foreground">Bezorgd in Nederland of België (incl. {euro(150)} verzending)</td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{euro(PRICE_DELIVERED)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Er is één model en één pakket; je kiest dus geen opties bij. De maker geeft een laagsteprijsgarantie: vind je een daktent met
          vergelijkbare materialen en voorzieningen voor minder, dan betaalt hij het verschil terug (volgens zijn eigen voorwaarden).
        </p>
        <p>
          <strong>Levertijd:</strong> op {CHECKED} meldt de maker dat de tenten van dit jaar verkocht zijn. Wie nu bestelt, krijgt de tent in
          november of december. Bekijken kan wel, op afspraak in Soerendonk.
        </p>
      </section>

      <section id="pakket">
        <h2>Wat zit er bij de Peter Penthouse?</h2>
        <ul>
          <li>De daktent met aanritsbare luifel (met opbergzak)</li>
          <li>Bevestigingsmaterialen voor dakdragers en 8 anti-diefstalmoeren</li>
          <li>Matras van 6 cm: 3 cm memory foam en 3 cm schuim met hoge dichtheid; het blijft in de tent liggen als je inklapt</li>
          <li>Anti-condensmat en 2 opbergnetten</li>
          <li>60W zonnepaneel met USB-A, USB-C en 12V/DC-uitgang</li>
          <li>Powerbank van 20.000 mAh</li>
          <li>Dimbare LED-verlichting</li>
          <li>Uitschuifbare ladder tot 230 cm</li>
          <li>2 jaar garantie</li>
        </ul>
        <p>
          Niet inbegrepen: dakdragers, een binnentent (thermo) en een ondertent. Het zonnepaneel is bedoeld voor telefoon, tablet en
          e-reader, niet voor een laptop of keukenapparaten.
        </p>
      </section>

      <section id="specificaties">
        <h2>Specificaties: maten, gewicht en materiaal</h2>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Uitgeklapt (l × b × h)", "190 × 230 × 130 cm"],
                ["Ingeklapt (l × b × h)", "190 × 115 × 25 cm"],
                ["Gewicht tent", "62 kg"],
                ["Gewicht ladder", "3 kg"],
                ["Draagvermogen uitgeklapt", "300 kg"],
                ["Type", "Semi-hardshell, klapt open als een boek; geen hydrauliek"],
                ["Boven- en onderplaat", "Aluminium honingraat"],
                ["Frame", "Aluminium"],
                ["Tentdoek", "320 g polyester-katoen"],
                ["Dakzeil", "420D Oxford"],
                ["Waterkolom", "3000 mm, bovenzijde 4000 mm"],
                ["Ramen", "Twee panoramische dakramen; alle ramen met hor en verduistering"],
                ["Kleur", "Alleen zwart"],
              ].map(([label, value], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-4 py-3 text-foreground font-medium w-1/2">{label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm">Bron: peter-penthouse.com (kopen, waarom en veelgestelde vragen), {CHECKED}.</p>
      </section>

      <section id="auto">
        <h2>Past de Peter Penthouse op jouw auto?</h2>
        <p>
          De tent gaat op <strong>dakdragers</strong>, niet rechtstreeks op dakrails. Dakrails, fixpoints of een klembevestiging in de
          deuropening werken allemaal, zolang er dakdragers op kunnen. Cabrio's, sportwagens en auto's met een panorama- of kunststof dak
          vallen meestal af.
        </p>
        <ul>
          <li><strong>Daklast:</strong> 62 kg tent plus je dakdragers moeten binnen de dynamische daklast van je auto blijven.</li>
          <li><strong>Afstand tussen de dragers:</strong> minimaal ongeveer 70 cm; dragers met 100 kg draagvermogen geven marge.</li>
          <li><strong>Hoogte:</strong> de ladder reikt tot 230 cm. Met dakdragers erbij adviseert de maker een auto van maximaal ongeveer 220 cm hoog; voor hogere busjes koop je een langere ladder los.</li>
          <li><strong>Imperiaal:</strong> kan, maar bij een opstaande rand heb je verhogers nodig, want de tent klapt helemaal plat open.</li>
        </ul>
        <p>Twijfel je over je eigen auto, dan kijkt de maker op verzoek mee als je merk, model en bouwjaar stuurt.</p>
      </section>

      <section id="kost-per-nacht">
        <h2>Wat kost de Peter Penthouse per nacht?</h2>
        <p>
          Dat hangt af van hoe vaak je weggaat. We rekenen met de calculator van deze site over {YEARS} jaar, zonder restwaarde bij verkoop.
          Kies hieronder je eigen situatie:
        </p>

        <div className="not-prose my-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 p-5 md:p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {[{ v: false, l: `Ophalen ${euro(PRICE_PICKUP)}` }, { v: true, l: `Bezorgd ${euro(PRICE_DELIVERED)}` }].map((o) => (
              <button
                key={o.l}
                onClick={() => setDelivered(o.v)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${delivered === o.v ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"}`}
              >
                {o.l}
              </button>
            ))}
          </div>
          <label className="block text-sm font-medium text-foreground mb-2" htmlFor="pp-nights">
            Nachten per jaar in de daktent: <strong>{nightsPerYear}</strong>
          </label>
          <input
            id="pp-nights"
            type="range"
            min={5}
            max={60}
            step={1}
            value={nightsPerYear}
            onChange={(e) => setNightsPerYear(Number(e.target.value))}
            className="w-full accent-[hsl(var(--primary))] mb-5"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-background/70 border border-border p-4">
              <p className="text-xs text-muted-foreground">Tent per nacht</p>
              <p className="font-display text-2xl font-bold text-foreground">{euro(live.tent, 2)}</p>
              <p className="text-xs text-muted-foreground">aanschaf, dakdragers, onderhoud</p>
            </div>
            <div className="rounded-lg bg-background/70 border border-border p-4">
              <p className="text-xs text-muted-foreground">Alles-in per nacht</p>
              <p className="font-display text-2xl font-bold text-foreground">{euro(live.allIn, 2)}</p>
              <p className="text-xs text-muted-foreground">plus camping, eten, brandstof</p>
            </div>
            <div className="rounded-lg bg-background/70 border border-border p-4">
              <p className="text-xs text-muted-foreground">Hotel per nacht (ter vergelijking)</p>
              <p className="font-display text-2xl font-bold text-foreground">{euro(live.hotel, 2)}</p>
              <p className="text-xs text-muted-foreground">kamer, eten, parkeren, toeristenbelasting</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Tegenover hotelovernachtingen heb je de tent en dakdragers na <strong>{live.breakEven} nachten</strong> terugverdiend.
          </p>
          <a
            href="/#calculator"
            onClick={openInCalculator}
            className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all"
          >
            Reken het helemaal door in de calculator →
          </a>
        </div>

        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Nachten per jaar</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Tent per nacht (bezorgd)</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Tent per nacht (opgehaald)</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Alles-in per nacht (bezorgd)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ n, d, p }, i) => (
                <tr key={n} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-4 py-3 text-foreground font-medium">{n}</td>
                  <td className="px-4 py-3 text-right text-foreground">{euro(d.tent, 2)}</td>
                  <td className="px-4 py-3 text-right text-foreground">{euro(p.tent, 2)}</td>
                  <td className="px-4 py-3 text-right text-foreground">{euro(d.allIn, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>De aannames achter deze cijfers</h3>
        <ul>
          <li>Periode {YEARS} jaar; de tent is daarna niets meer waard (in werkelijkheid verkoop je hem vaak door, dan wordt het goedkoper).</li>
          <li>Dakdragers {euro(defaultInputs.roofRackPrice)} en onderhoud {euro(defaultInputs.maintenancePerYear)} per jaar: de standaardwaarden van onze calculator, geen prijzen van de maker. Heb je al dakdragers, dan zakt de prijs per nacht.</li>
          <li>Geen stallingskosten: de tent past ingeklapt in een garage, schuur of op zolder.</li>
          <li>Alles-in rekent daarnaast met {euro(defaultInputs.campsitePricePerNight)} camping, {euro(defaultInputs.tentFoodPerDay)} eten en {euro(defaultInputs.extraFuelPerNight)} extra brandstof per nacht.</li>
          <li>Het hotel-alternatief: {euro(defaultInputs.hotelPricePerNight)} kamer, {euro(defaultInputs.hotelFoodPerDay)} eten, {euro(defaultInputs.hotelParkingPerDay)} parkeren en {euro(defaultInputs.touristTaxPerNight)} toeristenbelasting per nacht.</li>
        </ul>
        <p>Klopt een van deze aannames niet voor jou? In de <a href="/#calculator">calculator</a> pas je ze allemaal aan.</p>
      </section>

      <section id="huren">
        <h2>Peter Penthouse huren of kopen?</h2>
        <p>
          De maker verhuurt zelf niet, maar <a href="https://www.daktrail.nl/peter-penthouse-daktent" target="_blank" rel="noopener noreferrer">Daktrail</a> in
          Helmond en Gilze wel. Prijzen op {CHECKED}:
        </p>
        <ul>
          <li>Dag 1 tot en met 10: €25,00 per dag</li>
          <li>Dag 11 tot en met 15: €22,50 per dag</li>
          <li>Vanaf dag 16: €20,00 per dag</li>
          <li>Minimale huur: 7 dagen in vakantieperiodes, 4 dagen daarbuiten. Dakdragers huur je er los bij.</li>
        </ul>
        <p>
          <strong>Vuistregel:</strong> bij ongeveer 20 nachten per jaar, vijf jaar lang, kost kopen per nacht ({euro(perNight(PRICE_DELIVERED, 20).tent, 2)} inclusief
          dakdragers) ongeveer hetzelfde als huren (€25 per dag zonder dakdragers). Ga je minder vaak, dan is huren goedkoper; ga je vaker, dan wint kopen.
          Huren is ook een goede manier om te testen of een daktent bij je past voordat je {euro(PRICE_DELIVERED)} uitgeeft. Een huurkoopregeling is er niet.
        </p>
        <p>Bereken met jouw eigen reisplannen en kosten <a href="/daktent-huren-of-kopen">wanneer een daktent kopen goedkoper is dan huren</a>.</p>
      </section>

      <section id="pros-cons">
        <h2>Voordelen en nadelen van de Peter Penthouse</h2>
        <div className="my-6">
          <ProsCons
            pros={[
              "Compleet pakket: zonnepaneel, powerbank, matras, ladder en luifel zitten in de prijs",
              "Ruim uitgeklapt (190 × 230 cm), je kunt in beide richtingen liggen",
              "Plat ingeklapt (25 cm hoog) en zonder hydrauliek",
              "Matras blijft in de tent liggen bij het inklappen",
              "Alle ramen met hor en volledige verduistering",
              "Nederlandse verkoper; bezichtigen op afspraak en 2 jaar garantie",
            ]}
            cons={[
              "62 kg: zwaarder dan veel softshell-tenten, check je daklast",
              "Geen binnentent of ondertent, ook niet als optie",
              "Alleen in zwart",
              "Op dit moment pas in november of december leverbaar",
              "Standaardladder past tot ongeveer 220 cm autohoogte",
              "Nog geen onafhankelijke tests gevonden (stand oktober 2026)",
            ]}
          />
        </div>
      </section>

      <section id="faq">
        <h2>Veelgestelde vragen over de Peter Penthouse</h2>
        <div className="my-6">
          <FAQ items={faqItems} />
        </div>
      </section>

      <section id="oordeel">
        <h2>Ons oordeel: voor wie is de Peter Penthouse?</h2>
        <p>
          Op papier is de Peter Penthouse een complete daktent voor een duidelijke prijs: je hoeft geen zonnepaneel, matras of ladder bij te
          kopen. Dat maakt hem vooral interessant voor wie voor het eerst een daktent koopt en niet uren wil vergelijken. Wie een binnentent
          voor koude nachten wil, een andere kleur, of nu meteen op pad wil, moet verder kijken of eerst huren.
        </p>
        <p>
          Of hij zich voor jou terugverdient, hangt vooral af van het aantal nachten per jaar. Vul je eigen reispatroon in de{" "}
          <a href="/#calculator" onClick={openInCalculator}>calculator</a> in, of lees hoe een daktent het doet tegenover een{" "}
          <a href="/daktent-vs-hotel">hotel</a> en een <a href="/daktent-vs-camper">camper</a>.
        </p>
        <div className="not-prose my-6">
          <a
            href="https://www.peter-penthouse.com/kopen"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPeterPenthouseClick("review_page")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/30 text-primary font-bold text-sm hover:bg-primary/5 transition-all"
          >
            Actuele prijs en levertijd bij de maker →
          </a>
        </div>
      </section>
    </ArticleLayout>
  );
}
