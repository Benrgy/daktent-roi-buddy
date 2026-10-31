import { useEffect } from "react";
import { trackPeterPenthouseClick } from "@/lib/analytics";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { ComparisonTable } from "@/components/article/ComparisonTable";
import { ProsCons } from "@/components/article/ProsCons";
import { FAQ } from "@/components/article/FAQ";
import heroImg from "@/assets/hero-daktent-vs-hotel.jpg";

const tocItems = [
  { id: "intro", label: "Introductie" },
  { id: "kosten", label: "Kostenvergelijking" },
  { id: "comfort", label: "Comfort & Gemak" },
  { id: "flexibiliteit", label: "Flexibiliteit" },
  { id: "vergelijking", label: "Volledige Vergelijking" },
  { id: "voor-wie", label: "Voor Wie?" },
  { id: "pros-cons", label: "Voordelen & Nadelen" },
  { id: "ervaringen", label: "Ervaringen 2025" },
  { id: "faq", label: "Veelgestelde Vragen" },
  { id: "verdict", label: "Eindoordeel" },
];

export default function DaktentVsHotel() {
  useEffect(() => {
    document.title = "Daktent vs Hotel (2025) — Wat is Goedkoper? Eerlijke Vergelijking";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Is een daktent goedkoper dan een hotel? Ontdek de echte kosten, comfort en flexibiliteit in deze eerlijke vergelijking voor 2025. Met calculator.");
    
    // JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Daktent vs Hotel (2025) — Wat is Goedkoper?",
      description: "Eerlijke vergelijking tussen daktent en hotel op kosten, comfort en flexibiliteit.",
      datePublished: "2025-03-15",
      dateModified: "2025-03-27",
      author: { "@type": "Organization", name: "Daktent ROI Calculator" },
      publisher: { "@type": "Organization", name: "Daktent ROI Calculator" },
      mainEntityOfPage: "https://daktentroicalculator.online/daktent-vs-hotel",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <ArticleLayout
      title="Daktent vs Hotel"
      subtitle="Is een daktent écht goedkoper dan een hotel? We rekenen het eerlijk voor in 2025."
      heroImage={heroImg}
      tocItems={tocItems}
      publishDate="Maart 2025"
      readTime="8 min"
      breadcrumbLabel="Daktent vs Hotel"
    >
      {/* Intro */}
      <section id="intro">
        <h2>Daktent of Hotel: Wat is Slimmer in 2025?</h2>
        <p>Wanneer een daktent zich terugverdient, hangt af van jouw prijzen en hoe vaak je gaat. <a href="/#calculator">Reken het uit met de calculator</a>.</p>
        <p>Vergelijk aanschaf, dakdragers, camping en onderhoud met hotelovernachtingen, eten, parkeren en toeristenbelasting.</p>

      </section>

      {/* Kosten */}
      <section id="kosten">
        <h2>Kostenvergelijking: Daktent vs Hotel per Jaar</h2>
        <p>
          Vergelijk de kosten met jouw eigen reisplannen en prijzen in de <a href="/#calculator">calculator</a>.
        </p>

        <div className="not-prose my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🏕️ Daktent </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Daktent aanschaf</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Imperiaal/dakdragers</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Camping</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Onderhoud</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Eten zelf koken</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-primary text-lg">Jouw invoer</strong></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🏨 Hotel </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Hotelkamers</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Eten restaurant</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Parkeerkosten</span> <strong className="text-foreground">Jouw invoer</strong></li>
                <li className="flex justify-between"><span>Toeristenbelasting</span> <strong className="text-foreground">Jouw invoer</strong></li>
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
          Gebruik onze <a href="/#calculator">gratis calculator</a> om jouw persoonlijke besparing te berekenen met jouw eigen reispatroon.
        </p>
      </section>

      {/* Comfort */}
      <section id="comfort">
        <h2>Comfort: Hotel Luxe vs Daktent Avontuur</h2>
        <p>
          Laten we eerlijk zijn: een hotel biedt meer traditioneel comfort. Je hebt een eigen badkamer, 
          roomservice, airconditioning en een schoon bed dat voor je is opgemaakt.
        </p>
        <p>
          Maar comfort is relatief. Daktenten kunnen voorzien zijn van matrassen, 
          ventilatie en soms zelfs ingebouwde verlichting. Je slaapt letterlijk onder de sterren.
        </p>
        <p>
          Het verschil zit in wat je waardeert: <strong>luxe en gemak</strong> versus <strong>vrijheid en natuurbeleving</strong>. 
          Veel daktent-gebruikers rapporteren dat ze beter slapen in de buitenlucht dan in een hotelkamer.
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
          <p className="text-xs text-muted-foreground mt-2 text-center">Video: Daktent comfort in de praktijk</p>
        </div>
      </section>

      {/* Flexibiliteit */}
      <section id="flexibiliteit">
        <h2>Flexibiliteit & Vrijheid: Waar de Daktent Wint</h2>
        <p>
          Het grootste voordeel van een daktent is de <strong>totale vrijheid</strong>. 
          Geen reserveringen nodig, geen check-in tijden, geen beschikbaarheidsproblemen in het hoogseizoen.
        </p>
        <p>
          Vind je een mooi plekje aan een meer? Klap je tent uit in 2 minuten en je slaapt er. 
          Met een hotel ben je gebonden aan je boeking en locatie.
        </p>
        <ul>
          <li><strong>Last-minute trips:</strong> Een daktent maakt spontane weekendjes mogelijk zonder te boeken</li>
          <li><strong>Locatiekeuze:</strong> Slaap op plekken waar geen hotel staat — in de natuur, bij stranden, in de bergen</li>
          <li><strong>Geen annuleringskosten:</strong> Veranderde plannen? Geen stress over boekingen</li>
          <li><strong>Hoogseizoen:</strong> Hotels zijn vol of peperduur — campings hebben bijna altijd plek</li>
        </ul>
      </section>

      {/* Vergelijkingstabel */}
      <section id="vergelijking">
        <h2>Daktent vs Hotel: Volledige Vergelijking</h2>
        <div className="not-prose my-6">
          <ComparisonTable
            altLabel="🏨 Hotel"
            rows={[
              { label: "Prijs per nacht", daktent: "Jouw campingprijs", alt: "Jouw hotelprijs" },
              { label: "Eenmalige investering", daktent: "Jouw aanschafprijs", alt: "Geen aanschaf" },
              { label: "Eigen badkamer", daktent: "no", alt: "yes" },
              { label: "Airconditiong", daktent: "no", alt: "yes" },
              { label: "Natuurbeleving", daktent: "yes", alt: "no" },
              { label: "Flexibiliteit locatie", daktent: "yes", alt: "partial" },
              { label: "Last-minute boeken", daktent: "yes", alt: "partial" },
              { label: "Geschikt voor kinderen", daktent: "yes", alt: "partial" },
              { label: "Huisdieren mee", daktent: "yes", alt: "no" },
              { label: "Milieuvriendelijk", daktent: "yes", alt: "no" },
              { label: "Zelf koken mogelijk", daktent: "yes", alt: "no" },
              { label: "WiFi beschikbaar", daktent: "partial", alt: "yes" },
              { label: "Terugverdientijd", daktent: "Afhankelijk van jouw invoer", alt: "n.v.t." },
            ]}
          />
        </div>
      </section>

      {/* Voor wie */}
      <section id="voor-wie">
        <h2>Voor Wie is een Daktent Beter dan een Hotel?</h2>
        
        <h3>✅ Kies een daktent als je:</h3>
        <ul>
          <li>Regelmatig op vakantie gaat</li>
          <li>Houdt van natuur en buitenleven</li>
          <li>Graag spontaan op pad gaat</li>
          <li>Wilt besparen op vakantiekosten</li>
          <li>Met hond of huisdier reist</li>
          <li>Kinderen avontuur wilt bieden</li>
        </ul>

        <h3>🏨 Kies een hotel als je:</h3>
        <ul>
          <li>Maximaal comfort en luxe zoekt</li>
          <li>Weinig reist</li>
          <li>Een stedentrip maakt (Parijs, Barcelona)</li>
          <li>Fysieke beperkingen hebt (toegankelijkheid)</li>
          <li>Zakelijk reist</li>
        </ul>
      </section>

      {/* Pros & Cons */}
      <section id="pros-cons">
        <h2>Voordelen & Nadelen: Eerlijke Beoordeling</h2>
        <div className="my-6">
          <ProsCons
            pros={[
              "Kosten vergelijken op basis van jouw reisplannen",
              "Totale vrijheid in locatie en planning",
              "In 2 minuten op- en afgebouwd",
              "Unieke natuurervaring voor het hele gezin",
              "Milieuvriendelijker dan hotelovernachtingen",
              "Geen last-minute prijsopslag in hoogseizoen",
              "Huisdieren altijd welkom",
            ]}
            cons={[
              "Eenmalige investering in tent en dakdragers",
              "Geen eigen badkamer (sanitair op camping)",
              "Weersafhankelijk — regen en wind merkbaar",
              "Minder geschikt voor steden",
              "Beperkte opbergruimte vergeleken met hotelkamer",
              "Niet ideaal voor mensen met mobiliteitsproblemen",
            ]}
          />
        </div>
      </section>

      {/* Ervaringen */}
      <section id="ervaringen">
        <h2>Ervaringen van Daktent-Gebruikers (2025)</h2>
        


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
        <h2>Veelgestelde Vragen over Daktent vs Hotel</h2>
        <div className="my-6">
          <FAQ items={[
            { q: "Is een daktent echt goedkoper dan een hotel?", a: "Dat hangt af van jouw hotelprijzen, campingkosten en reispatroon. Reken jouw situatie uit met de calculator." },
            { q: "Hoe snel verdient een daktent zich terug?", a: "De terugverdientijd hangt af van jouw aanschafprijs, overige kosten en hoe vaak je gaat. Vul jouw eigen prijzen in de calculator in." },
            { q: "Is een daktent comfortabel genoeg?", a: "Moderne daktenten hebben schuimmatrassen, goede ventilatie en zijn waterdicht. Het comfort is vergelijkbaar met kamperen in een caravan, maar dan verhoogd en veiliger." },
            { q: "Kan ik een daktent het hele jaar door gebruiken?", a: "Ja, met de juiste uitrusting (slaapzak voor lage temperaturen, extra isolatie) kun je ook in herfst en winter kamperen. Veel gebruikers kamperen van maart tot november." },
            { q: "Wat zijn de verborgen kosten van een daktent?", a: "Naast de aanschaf moet je rekening houden met dakdragers, onderhoud en eventuele stalling. Neem jouw eigen kosten mee in de calculator." },
            { q: "Past een daktent op elke auto?", a: "Controleer de maximale dakbelasting in het instructieboekje van jouw auto en tel het gewicht van tent en dakdragers op." },
          ]} />
        </div>
      </section>

      {/* Verdict */}
      <section id="verdict">
        <h2>Eindoordeel: Daktent vs Hotel in 2025</h2>
        
        <div className="not-prose my-6 p-6 rounded-xl bg-primary/5 border border-primary/15">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Daktent als hotel-alternatief</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Een daktent past bij reizen in de natuur; een hotel bij wie meer voorzieningen zoekt.
            Welke optie financieel bij jou past, hangt af van jouw prijzen en reispatroon. <a href="/#calculator">Vergelijk jouw kosten met de calculator</a>.
          </p>
        </div>

        {/* Peter Penthouse aanbeveling */}
        <div className="not-prose my-6 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-card to-primary/5">
          <h3 className="font-display text-lg font-bold text-foreground mb-2">🏕️ Onze Aanbeveling: Peter Penthouse Daktent</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Zoek je een daktent die het verschil maakt? De Peter Penthouse (€1.800 opgehaald, €1.950 bezorgd) wordt geleverd als compleet pakket: 
            6 cm premium matras, 60W zonnepaneel met 20.000 mAh powerbank, 320 GSM waterdicht canvas en aluminium frame. 
            Geen verborgen kosten, geen upsells — plug & play.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
            <span>☀️ Off-grid klaar</span>
            <span>🛏️ Matras inbegrepen</span>
            <span>⛽ Inklapbaar ontwerp</span>
            <span>🔧 Geen kwetsbare hydrauliek</span>
          </div>
          <a
            href="https://www.peter-penthouse.com/?ref=calculator"
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackPeterPenthouseClick('article_hotel_verdict')}
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
          <a href="/#calculator">gratis ROI calculator</a> en ontdek hoeveel je kunt besparen.
        </p>
        <p>
          Bekijk ook onze vergelijking van{" "}
          <a href="/daktent-vs-camper">daktent vs camper</a> voor een compleet beeld van alle opties.
        </p>
      </section>
    </ArticleLayout>
  );
}
