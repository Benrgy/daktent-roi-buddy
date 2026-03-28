import { useEffect } from "react";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { ComparisonTable } from "@/components/article/ComparisonTable";
import { ProsCons } from "@/components/article/ProsCons";
import { FAQ } from "@/components/article/FAQ";
import heroImg from "@/assets/hero-daktent-vs-camper.jpg";

const tocItems = [
  { id: "intro", label: "Introductie" },
  { id: "kosten", label: "Kostenvergelijking" },
  { id: "praktisch", label: "Praktische Verschillen" },
  { id: "rijervaring", label: "Rijden & Parkeren" },
  { id: "vergelijking", label: "Volledige Vergelijking" },
  { id: "voor-wie", label: "Voor Wie?" },
  { id: "pros-cons", label: "Voordelen & Nadelen" },
  { id: "ervaringen", label: "Ervaringen 2025" },
  { id: "faq", label: "Veelgestelde Vragen" },
  { id: "verdict", label: "Eindoordeel" },
];

export default function DaktentVsCamper() {
  useEffect(() => {
    document.title = "Daktent vs Camper (2025) — Eerlijke Vergelijking op Kosten & Gemak";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Daktent of camper? Vergelijk de kosten, het gemak en de flexibiliteit in 2025. Ontdek wat beter bij jou past met onze eerlijke analyse en calculator.");
    
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Daktent vs Camper (2025) — Eerlijke Vergelijking",
      description: "Vergelijk daktent en camper op kosten, gemak en flexibiliteit in 2025.",
      datePublished: "2025-03-15",
      dateModified: "2025-03-27",
      author: { "@type": "Organization", name: "Daktent ROI Calculator" },
      publisher: { "@type": "Organization", name: "Daktent ROI Calculator" },
      mainEntityOfPage: "https://daktentroicalculator.online/daktent-vs-camper",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <ArticleLayout
      title="Daktent vs Camper"
      subtitle="Koop je een daktent of huur je een camper? We vergelijken de kosten, het gemak en de flexibiliteit."
      heroImage={heroImg}
      tocItems={tocItems}
      publishDate="Maart 2025"
      readTime="9 min"
      breadcrumbLabel="Daktent vs Camper"
    >
      {/* Intro */}
      <section id="intro">
        <h2>Daktent of Camper: De Grote Vergelijking van 2025</h2>
        <p>
          <strong>Een daktent kost €1.500-€3.000 eenmalig, terwijl een camper huren al snel €100-€180 per dag kost.</strong>{" "}
          Na slechts 2-3 weken kamperen heb je de daktent terugverdiend. Maar is het zo simpel?
        </p>
        <p>
          De keuze tussen een daktent en een camper gaat verder dan alleen geld. Het gaat om lifestyle, 
          comfort, flexibiliteit en wat je belangrijk vindt op reis. In dit artikel vergelijken we beide opties eerlijk en uitgebreid.
        </p>
        <p>
          Of je nu overweegt om een camper te huren voor je volgende vakantie, of dat je twijfelt over de aanschaf 
          van een daktent — na dit artikel weet je precies wat bij jou past.
        </p>

        <blockquote>
          "We huurden 3 jaar een camper voor onze zomervakantie. Toen we uitrekenden dat we €12.000 hadden uitgegeven, 
          kochten we een daktent van €2.200. Beste beslissing ooit."
          — Robert, 41, Den Haag
        </blockquote>
      </section>

      {/* Kosten */}
      <section id="kosten">
        <h2>Kostenvergelijking: Daktent vs Camper Huren</h2>
        <p>
          Laten we een realistisch scenario doorrekenen: <strong>een gezin dat 21 dagen per jaar op vakantie gaat</strong>, 
          vergeleken over 5 jaar.
        </p>

        <div className="not-prose my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🏕️ Daktent (5 jaar)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Daktent aanschaf</span> <strong className="text-foreground">€2.200</strong></li>
                <li className="flex justify-between"><span>Dakdragers</span> <strong className="text-foreground">€400</strong></li>
                <li className="flex justify-between"><span>Camping (21d × 5j × €30)</span> <strong className="text-foreground">€3.150</strong></li>
                <li className="flex justify-between"><span>Brandstof eigen auto</span> <strong className="text-foreground">€2.625</strong></li>
                <li className="flex justify-between"><span>Onderhoud (5j × €75)</span> <strong className="text-foreground">€375</strong></li>
                <li className="flex justify-between"><span>Eten zelf koken</span> <strong className="text-foreground">€5.250</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-primary text-lg">€14.000</strong></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🚐 Camper Huren (5 jaar)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Huur (21d × 5j × €140)</span> <strong className="text-foreground">€14.700</strong></li>
                <li className="flex justify-between"><span>Verzekering (21d × 5j × €15)</span> <strong className="text-foreground">€1.575</strong></li>
                <li className="flex justify-between"><span>Brandstof camper</span> <strong className="text-foreground">€5.250</strong></li>
                <li className="flex justify-between"><span>Campingplaats camper</span> <strong className="text-foreground">€5.250</strong></li>
                <li className="flex justify-between"><span>Eten</span> <strong className="text-foreground">€5.250</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-[hsl(var(--danger))] text-lg">€32.025</strong></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--success-light))] border border-[hsl(var(--success))]/20 text-center">
            <p className="text-lg font-bold text-foreground">💰 Besparing met daktent: <span className="text-[hsl(var(--success))]">€18.025</span> in 5 jaar</p>
            <p className="text-sm text-muted-foreground">Dat is €3.605 per jaar of €300 per maand</p>
          </div>
        </div>

        <p>
          En een eigen camper kopen dan? Een fatsoenlijke camper kost €40.000-€80.000. Tel daar verzekering (€1.200/jaar), 
          wegenbelasting (€600/jaar), onderhoud (€1.000/jaar) en stalling (€1.200/jaar) bij op. 
          <strong>Zelfs een eigen camper is 3-5x duurder dan een daktent.</strong>
        </p>
        <p>
          <a href="/#calculator">Bereken je eigen besparing →</a>
        </p>
      </section>

      {/* Praktisch */}
      <section id="praktisch">
        <h2>Praktische Verschillen: Dagelijks Gebruik</h2>
        
        <h3>Opbouwtijd</h3>
        <p>
          Een moderne daktent klap je open in <strong>1-2 minuten</strong>. Hardshell-modellen zelfs in 30 seconden. 
          Bij een camper heb je geen opbouwtijd, maar je moet wel de hele camper rijden, parkeren en aansluiten.
        </p>

        <h3>Opbergruimte</h3>
        <p>
          Hier wint de camper duidelijk. Een camper heeft een koelkast, kookgelegenheid, toilet en soms een douche. 
          Met een daktent gebruik je je auto als opbergruimte en kook je buiten op een campinggastel.
        </p>

        <h3>Dagelijks comfort</h3>
        <p>
          Een camper biedt meer wooncomfort: je hebt een dak boven je hoofd bij regen, een keuken binnenin, 
          en soms verwarming. Bij een daktent leef je meer buiten — wat voor veel mensen juist de charme is.
        </p>

        {/* YouTube embed */}
        <div className="not-prose my-6">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/zlluVZaTwkY"
              title="Daktent review – eerlijke ervaring"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="border-0"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Video: Daktent vs camper in de praktijk</p>
        </div>
      </section>

      {/* Rijden */}
      <section id="rijervaring">
        <h2>Rijden, Parkeren & Mobiliteit</h2>
        <p>
          Dit is waar de daktent <strong>enorm wint</strong>. Met een daktent op je auto rij je gewoon zoals je 
          altijd rijdt. Je auto is nog steeds een auto. Je kunt overal parkeren, door smalle straatjes rijden, 
          en op normale plekken tanken.
        </p>
        <p>
          Een camper is een ander verhaal: moeilijk parkeren in steden, duur tanken (1 op 6-8), soms te groot 
          voor bepaalde wegen, en je hebt een apart rijbewijs nodig voor modellen boven de 3.500 kg.
        </p>
        <ul>
          <li><strong>Brandstofverbruik:</strong> Auto met daktent: 1 op 12-15 · Camper: 1 op 6-8</li>
          <li><strong>Tolkosten:</strong> Auto-tarief vs hogere campertarieven</li>
          <li><strong>Parkeren in steden:</strong> Daktent-auto past overal · Camper vaak niet</li>
          <li><strong>Veerpont:</strong> Auto-tarief vs duurdere camper-tarieven</li>
        </ul>
      </section>

      {/* Vergelijkingstabel */}
      <section id="vergelijking">
        <h2>Daktent vs Camper: Volledige Vergelijking</h2>
        <div className="not-prose my-6">
          <ComparisonTable
            altLabel="🚐 Camper"
            rows={[
              { label: "Aanschafprijs", daktent: "€1.500-3.000", alt: "€40.000-80.000" },
              { label: "Huurkosten per dag", daktent: "n.v.t.", alt: "€100-180" },
              { label: "Rijdt als een auto", daktent: "yes", alt: "no" },
              { label: "Parkeren in steden", daktent: "yes", alt: "no" },
              { label: "Eigen keuken", daktent: "no", alt: "yes" },
              { label: "Eigen toilet", daktent: "no", alt: "partial" },
              { label: "Opbouwtijd", daktent: "1-2 min", alt: "0 min" },
              { label: "Brandstofverbruik", daktent: "1:12-15", alt: "1:6-8" },
              { label: "Stalling nodig", daktent: "no", alt: "yes" },
              { label: "Verzekering", daktent: "partial", alt: "€1.200/jaar" },
              { label: "Geschikt voor off-road", daktent: "yes", alt: "no" },
              { label: "Huisdieren mee", daktent: "yes", alt: "partial" },
              { label: "Natuurbeleving", daktent: "yes", alt: "partial" },
              { label: "Doordeweeks bruikbaar", daktent: "yes", alt: "no" },
            ]}
          />
        </div>
      </section>

      {/* Voor wie */}
      <section id="voor-wie">
        <h2>Voor Wie is een Daktent Beter dan een Camper?</h2>
        
        <h3>✅ Kies een daktent als je:</h3>
        <ul>
          <li>Je bestaande auto wilt blijven gebruiken</li>
          <li>Budget-bewust bent en wilt besparen</li>
          <li>Graag off-road of avontuurlijke plekken opzoekt</li>
          <li>Flexibel wilt zijn en ook doordeweeks je auto nodig hebt</li>
          <li>Geen stalling of extra verzekering wilt</li>
          <li>Houdt van outdoor leven en kamperen</li>
        </ul>

        <h3>🚐 Kies een camper als je:</h3>
        <ul>
          <li>Maximaal wooncomfort op reis wilt (keuken, toilet, douche)</li>
          <li>Langere reizen maakt van 4+ weken</li>
          <li>Slecht weer geen probleem mag zijn</li>
          <li>Fysieke beperkingen hebt</li>
          <li>Met meer dan 4 personen reist</li>
          <li>Fulltime wilt reizen (digital nomad)</li>
        </ul>
      </section>

      {/* Pros & Cons */}
      <section id="pros-cons">
        <h2>Voordelen & Nadelen van de Daktent vs Camper</h2>
        <div className="my-6">
          <ProsCons
            pros={[
              "10-20x goedkoper in aanschaf dan een eigen camper",
              "Je eigen auto blijft bruikbaar voor dagelijks gebruik",
              "Geen stalling, extra verzekering of wegenbelasting nodig",
              "Veel minder brandstofkosten dankzij lager verbruik",
              "Parkeren en manoeuvreren zoals met een gewone auto",
              "Ideaal voor off-road en moeilijk bereikbare plekken",
              "In 1-2 minuten opgebouwd — sneller dan een camper parkeren",
            ]}
            cons={[
              "Geen eigen keuken, toilet of douche (sanitair op camping)",
              "Minder bescherming bij extreem slecht weer",
              "Beperktere leefruimte vergeleken met camper",
              "Zelf koken op campinggastel vereist aanpassingsvermogen",
              "Niet ideaal voor lange reizen van 4+ weken",
              "Matras is comfortabel maar kleiner dan een camperbed",
            ]}
          />
        </div>
      </section>

      {/* Ervaringen */}
      <section id="ervaringen">
        <h2>Ervaringen: Van Camper naar Daktent (2025)</h2>
        
        <blockquote>
          "5 jaar camperhuur = €18.000 uitgegeven en niks over. Nu kamperen we met onze daktent 
          al 2 jaar en hebben we nog steeds dezelfde tent. Totale kosten tot nu toe: €4.000."
          <br /><strong>— Thijs & Marloes, Rotterdam (januari 2025)</strong>
        </blockquote>

        <blockquote>
          "Het mooiste aan een daktent is dat je auto gewoon je auto blijft. Maandag naar werk, 
          vrijdag klap je de tent uit. Probeer dat maar eens met een camper."
          <br /><strong>— Dennis, 36, Eindhoven (februari 2025)</strong>
        </blockquote>

        <blockquote>
          "We hadden een eigen camper van €55.000. Tussen stalling, verzekering en onderhoud 
          waren we €4.000 per jaar kwijt — zonder te rijden. Nu doen we alles met de daktent."
          <br /><strong>— Annemiek, 52, Groningen (maart 2025)</strong>
        </blockquote>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2>Veelgestelde Vragen: Daktent vs Camper</h2>
        <div className="my-6">
          <FAQ items={[
            { q: "Is een daktent echt goedkoper dan een camper huren?", a: "Ja, significant. Een camper huren kost €100-180/dag. Na 15-20 huurdagen heb je de aanschafprijs van een daktent (€1.500-3.000) al uitgegeven. Vanaf dat moment bespaar je met elke trip." },
            { q: "Kan een daktent op elke auto?", a: "De meeste SUV's, crossovers en stationwagens zijn geschikt. Je auto moet minimaal 50-75 kg dynamisch daklaadvermogen hebben. Check de specificaties van je auto bij de dealer." },
            { q: "Is een daktent comfortabel genoeg voor 2 weken vakantie?", a: "Ja, veel gezinnen gebruiken hun daktent voor 2-3 weken vakanties. Met een goed matras, campingkeuken en de juiste uitrusting is het zeer comfortabel. Het is vergelijkbaar met kamperen in een tent, maar dan verhoogd en droger." },
            { q: "Wat als het regent?", a: "Moderne daktenten zijn waterdicht en bestand tegen flinke regenbuien. Een luifel of tarp eronder geeft je extra beschutte ruimte. Bij extreme neerslag heb je in een camper meer comfort, maar voor normaal weer is een daktent prima." },
            { q: "Heb ik een speciaal rijbewijs nodig voor een daktent?", a: "Nee, dat is juist het mooie. Je rijdt gewoon met je eigen auto en rijbewijs B. Voor grotere campers (boven 3.500 kg) heb je rijbewijs C1 nodig." },
            { q: "Hoe lang gaat een daktent mee?", a: "Bij goed onderhoud gaat een kwaliteitsdaktent 10-15 jaar mee. De stof, ritsen en hardware zijn ontworpen voor intensief buitengebruik. Vergelijk dat met de afschrijving van een camper." },
          ]} />
        </div>
      </section>

      {/* Verdict */}
      <section id="verdict">
        <h2>Eindoordeel: Daktent vs Camper in 2025</h2>
        
        <div className="not-prose my-6 p-6 rounded-xl bg-primary/5 border border-primary/15">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⭐</span>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">9.0 / 10</p>
              <p className="text-sm text-muted-foreground">Daktent als camper-alternatief</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Voor de meeste kampeerders is een daktent het betere alternatief voor een camper. Je bespaart tienduizenden euro's, 
            behoudt de flexibiliteit van je eigen auto, en geniet van een unieke kampeerervaring. 
            Alleen als je extreme wooncomfort op reis nodig hebt of fulltime reist, is een camper de betere keuze.
          </p>
        </div>

        <p>
          <strong>Onze aanbeveling:</strong> Bereken je persoonlijke besparing met onze{" "}
          <a href="/#calculator">gratis ROI calculator</a> en vergelijk daktent, camper, hotel én caravan.
        </p>
        <p>
          Lees ook onze vergelijking van{" "}
          <a href="/daktent-vs-hotel">daktent vs hotel</a> voor het complete plaatje.
        </p>
      </section>
    </ArticleLayout>
  );
}
