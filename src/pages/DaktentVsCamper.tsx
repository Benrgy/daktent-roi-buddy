import { useEffect } from "react";
import { trackPeterPenthouseClick } from "@/lib/analytics";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { ComparisonTable } from "@/components/article/ComparisonTable";
import { ProsCons } from "@/components/article/ProsCons";
import { FAQ } from "@/components/article/FAQ";
import heroImg from "@/assets/hero-daktent-vs-camper.jpg";
import { useRouteSeo } from "@/seo/useRouteSeo";

const tocItems = [
  { id: "intro", label: "Introductie" },
  { id: "kosten", label: "Kostenvergelijking" },
  { id: "praktisch", label: "Praktische Verschillen" },
  { id: "rijervaring", label: "Rijden & Parkeren" },
  { id: "vergelijking", label: "Volledige Vergelijking" },
  { id: "voor-wie", label: "Voor Wie?" },
  { id: "pros-cons", label: "Voordelen & Nadelen" },
  { id: "ervaringen", label: "Video: ervaringen en tips met een daktent" },
  { id: "faq", label: "Veelgestelde Vragen" },
  { id: "verdict", label: "Eindoordeel" },
];

export default function DaktentVsCamper() {
  const seo = useRouteSeo("/daktent-vs-camper");
  useEffect(() => {
    
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Daktent vs camper: eerlijke vergelijking op kosten en gemak",
      description: "Vergelijk daktent en camper op kosten, gemak en flexibiliteit.",
      datePublished: "2025-03-15",
      dateModified: "2026-10-31",
      author: { "@type": "Organization", name: "Daktent ROI Calculator" },
      publisher: { "@type": "Organization", name: "Daktent ROI Calculator" },
      mainEntityOfPage: "https://daktentroicalculator.online/daktent-vs-camper",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <ArticleLayout
      title={seo.h1}
      subtitle="Koop je een daktent of huur je een camper? We vergelijken de kosten, het gemak en de flexibiliteit."
      heroImage={heroImg}
      tocItems={tocItems}
      publishDate="Maart 2025"
      readTime="9 min"
      breadcrumbLabel="Daktent vs Camper"
    >
      {/* Intro */}
      <section id="intro">
        <h2>Daktent of camper: de grote vergelijking</h2>
        <p>
          Wanneer een daktent zich terugverdient tegenover camperhuur, hangt af van jouw prijzen en hoe vaak je gaat. <a href="/#calculator">Reken het uit met de calculator</a>.
        </p>
        <p>
          De keuze tussen een daktent en een camper gaat verder dan alleen geld. Het gaat om lifestyle, 
          comfort, flexibiliteit en wat je belangrijk vindt op reis. In dit artikel vergelijken we beide opties eerlijk en uitgebreid.
        </p>
        <p>
          Of je nu overweegt om een camper te huren voor je volgende vakantie, of dat je twijfelt over de aanschaf 
          van een daktent — na dit artikel weet je precies wat bij jou past.
        </p>

      </section>

      {/* Kosten */}
      <section id="kosten">
        <h2>Kostenvergelijking: Daktent vs Camper Huren</h2>
        <p>
          Vergelijk de kosten met jouw eigen reisplannen en prijzen in de <a href="/#calculator">calculator</a>.
        </p>

        <div className="not-prose my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🏕️ Daktent </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Daktent aanschaf</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Dakdragers</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Camping</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Brandstof eigen auto</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Onderhoud</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Eten zelf koken</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-primary text-lg">Jouw invoer</strong></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🚐 Camper Huren </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Huur</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Verzekering</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Brandstof camper</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Campingplaats camper</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Eten</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-[hsl(var(--danger))] text-lg">Jouw invoer</strong></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--success-light))] border border-[hsl(var(--success))]/20 text-center">
            <p className="text-lg font-bold text-foreground">Vergelijk jouw totale kosten</p>
            <p className="text-sm text-muted-foreground"><a href="/#calculator">Reken het uit met de calculator</a></p>
          </div>
        </div>

        <p>
          Overweeg je een eigen camper? Neem aanschaf, verzekering, wegenbelasting, onderhoud en stalling mee in je vergelijking.
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
          Een camper is een ander verhaal: moeilijk parkeren in steden, brandstofkosten, soms te groot 
          voor bepaalde wegen. Controleer welk rijbewijs nodig is voor de gekozen camper.
        </p>
        <ul>
          <li><strong>Brandstofverbruik:</strong> Vergelijk het verbruik van jouw auto met dat van de gekozen camper</li>
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
              { label: "Aanschafprijs", daktent: "Jouw tentprijs", alt: "Jouw camperprijs" },
              { label: "Huurkosten per dag", daktent: "n.v.t.", alt: "Prijs van jouw verhuurder" },
              { label: "Rijdt als een auto", daktent: "yes", alt: "no" },
              { label: "Parkeren in steden", daktent: "yes", alt: "no" },
              { label: "Eigen keuken", daktent: "no", alt: "yes" },
              { label: "Eigen toilet", daktent: "no", alt: "partial" },
              { label: "Opbouwtijd", daktent: "1-2 min", alt: "0 min" },
              { label: "Brandstofverbruik", daktent: "Verbruik van jouw auto", alt: "Verbruik van jouw camper" },
              { label: "Stalling nodig", daktent: "no", alt: "yes" },
              { label: "Verzekering", daktent: "partial", alt: "Jouw verzekeringskosten" },
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
          <li>Langere reizen maakt</li>
          <li>Slecht weer geen probleem mag zijn</li>
          <li>Fysieke beperkingen hebt</li>
          <li>Met een groep reist die extra leefruimte nodig heeft</li>
          <li>Fulltime wilt reizen (digital nomad)</li>
        </ul>
      </section>

      {/* Pros & Cons */}
      <section id="pros-cons">
        <h2>Voordelen & Nadelen van de Daktent vs Camper</h2>
        <div className="my-6">
          <ProsCons
            pros={[
              "Vergelijk de aanschafkosten met jouw eigen budget",
              "Je eigen auto blijft bruikbaar voor dagelijks gebruik",
              "Geen stalling, extra verzekering of wegenbelasting nodig",
              "Brandstofkosten vergelijken voor jouw auto en camper",
              "Parkeren en manoeuvreren zoals met een gewone auto",
              "Ideaal voor off-road en moeilijk bereikbare plekken",
              "In 1-2 minuten opgebouwd — sneller dan een camper parkeren",
            ]}
            cons={[
              "Geen eigen keuken, toilet of douche (sanitair op camping)",
              "Minder bescherming bij extreem slecht weer",
              "Beperktere leefruimte vergeleken met camper",
              "Zelf koken op campinggastel vereist aanpassingsvermogen",
              "Minder leefruimte tijdens lange reizen",
              "Matras is comfortabel maar kleiner dan een camperbed",
            ]}
          />
        </div>
      </section>

      {/* Ervaringen */}
      <section id="ervaringen">
        <h2>Video: ervaringen en tips met een daktent</h2>
        


        {/* YouTube embed */}
        <div className="not-prose my-6">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/hW7xDSUW_yw"
              title="Daktent ervaringen en tips"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2>Veelgestelde Vragen: Daktent vs Camper</h2>
        <div className="my-6">
          <FAQ items={[
            { q: "Is een daktent echt goedkoper dan een camper huren?", a: "Dat hangt af van jouw huurprijs, aanschafkosten en reispatroon. Vul jouw eigen prijzen in de calculator in." },
            { q: "Kan een daktent op elke auto?", a: "Controleer de maximale dakbelasting in het instructieboekje van jouw auto en tel het gewicht van tent en dakdragers op." },
            { q: "Is een daktent comfortabel genoeg voor een vakantie?", a: "Dat hangt af van jouw voorkeuren, de tent en de uitrusting. Probeer een daktent als je twijfelt of het comfort bij jou past." },
            { q: "Wat als het regent?", a: "Moderne daktenten zijn waterdicht en bestand tegen flinke regenbuien. Een luifel of tarp eronder geeft je extra beschutte ruimte. Bij extreme neerslag heb je in een camper meer comfort, maar voor normaal weer is een daktent prima." },
            { q: "Heb ik een speciaal rijbewijs nodig voor een daktent?", a: "Controleer de eisen voor jouw voertuig en uitrusting. Vergelijk je met een camper, controleer dan ook welk rijbewijs voor die camper nodig is." },
            { q: "Hoe lang gaat een daktent mee?", a: "Dat hangt af van de tent, het gebruik, onderhoud en opslag. Volg de onderhoudsadviezen van de fabrikant." },
          ]} />
        </div>
      </section>

      {/* Verdict */}
      <section id="verdict">
        <h2>Eindoordeel: daktent vs camper</h2>
        
        <div className="not-prose my-6 p-6 rounded-xl bg-primary/5 border border-primary/15">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Daktent als camper-alternatief</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Een daktent houdt je eigen auto bruikbaar; een camper biedt meer leefruimte.
            Welke optie financieel bij jou past, hangt af van jouw prijzen en reispatroon. <a href="/#calculator">Vergelijk jouw kosten met de calculator</a>.
          </p>
        </div>

        {/* Peter Penthouse aanbeveling */}
        <div className="not-prose my-6 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-card to-primary/5">
          <h3 className="font-display text-lg font-bold text-foreground mb-2">🏕️ Onze Aanbeveling: Peter Penthouse Daktent</h3>
          <p className="text-sm text-muted-foreground mb-3">
            De Peter Penthouse (€1.800 opgehaald, €1.950 bezorgd) wordt geleverd als pakket. 
            Ingebouwd 60W zonnepaneel, 6 cm premium matras, inklapbaar ontwerp — 
            en je auto blijft gewoon je auto.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
            <span>☀️ Off-grid klaar</span>
            <span>📦 Compleet pakket</span>
            <span>🚗 Rijdt als een gewone auto</span>
            <span>🔧 Geen onderhoud zoals een camper</span>
          </div>
          <a
            href="https://www.peter-penthouse.com/?ref=calculator"
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackPeterPenthouseClick('article_camper_verdict')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all"
          >
            Bekijk Peter Penthouse →
          </a>
        </div>

        <p>
          Wil je eerst de details? Lees onze{" "}
          <a href="/peter-penthouse-daktent">Peter Penthouse review met prijs, specificaties en kosten per nacht</a>.
        </p>

        <p>
          <strong>Bereken je besparing:</strong> Gebruik onze{" "}
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
