import { useEffect } from "react";
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
        <p>
          <strong>Een daktent bespaart het gemiddelde gezin €1.200 tot €3.500 per jaar</strong> vergeleken met hotelovernachtingen. 
          Dat klinkt misschien ongeloofwaardig, maar als je de cijfers naast elkaar legt, is het verschil enorm.
        </p>
        <p>
          Hotels worden steeds duurder. In 2025 betaal je in populaire Europese bestemmingen al snel €120-€180 per nacht 
          voor een fatsoenlijke kamer. Tel daar het eten, parkeerkosten en toeristenbelasting bij op, en je zit al gauw 
          boven de €200 per dag.
        </p>
        <p>
          Een daktent kost eenmalig €1.500-€3.000 en daarna betaal je alleen nog campingkosten van gemiddeld €25-€40 per nacht. 
          Na 15-25 overnachtingen heb je de investering terugverdiend.
        </p>

        <blockquote>
          "We hadden de daktent na onze eerste zomervakantie al terugverdiend. Nu voelt elk weekend kamperen als gratis vakantie." 
          — Mark, 38, uit Utrecht
        </blockquote>
      </section>

      {/* Kosten */}
      <section id="kosten">
        <h2>Kostenvergelijking: Daktent vs Hotel per Jaar</h2>
        <p>
          Laten we een realistisch scenario bekijken: <strong>een stel dat 30 nachten per jaar op reis gaat</strong> over een periode van 5 jaar.
        </p>

        <div className="not-prose my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🏕️ Daktent (5 jaar)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Daktent aanschaf</span> <strong className="text-foreground">€2.200</strong></li>
                <li className="flex justify-between"><span>Imperiaal/dakdragers</span> <strong className="text-foreground">€400</strong></li>
                <li className="flex justify-between"><span>Camping (30n × 5j × €30)</span> <strong className="text-foreground">€4.500</strong></li>
                <li className="flex justify-between"><span>Onderhoud (5j × €75)</span> <strong className="text-foreground">€375</strong></li>
                <li className="flex justify-between"><span>Eten zelf koken (30n × 5j × €25)</span> <strong className="text-foreground">€3.750</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-primary text-lg">€11.225</strong></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">🏨 Hotel (5 jaar)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Hotelkamers (30n × 5j × €130)</span> <strong className="text-foreground">€19.500</strong></li>
                <li className="flex justify-between"><span>Eten restaurant (30n × 5j × €60)</span> <strong className="text-foreground">€9.000</strong></li>
                <li className="flex justify-between"><span>Parkeerkosten (30n × 5j × €15)</span> <strong className="text-foreground">€2.250</strong></li>
                <li className="flex justify-between"><span>Toeristenbelasting (30n × 5j × €4)</span> <strong className="text-foreground">€600</strong></li>
                <li className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-bold">Totaal</span> <strong className="text-[hsl(var(--danger))] text-lg">€31.350</strong></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--success-light))] border border-[hsl(var(--success))]/20 text-center">
            <p className="text-lg font-bold text-foreground">💰 Besparing met daktent: <span className="text-[hsl(var(--success))]">€20.125</span> in 5 jaar</p>
            <p className="text-sm text-muted-foreground">Dat is €4.025 per jaar of €335 per maand</p>
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
          Maar comfort is relatief. Moderne daktenten in 2025 bieden dikke matrassen (8-10 cm), 
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
              { label: "Prijs per nacht", daktent: "€25-40", alt: "€100-200" },
              { label: "Eenmalige investering", daktent: "€1.500-3.000", alt: "€0" },
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
              { label: "Terugverdientijd", daktent: "15-25 nachten", alt: "n.v.t." },
            ]}
          />
        </div>
      </section>

      {/* Voor wie */}
      <section id="voor-wie">
        <h2>Voor Wie is een Daktent Beter dan een Hotel?</h2>
        
        <h3>✅ Kies een daktent als je:</h3>
        <ul>
          <li>Meer dan 10 nachten per jaar op vakantie gaat</li>
          <li>Houdt van natuur en buitenleven</li>
          <li>Graag spontaan op pad gaat</li>
          <li>Wilt besparen op vakantiekosten</li>
          <li>Met hond of huisdier reist</li>
          <li>Kinderen avontuur wilt bieden</li>
        </ul>

        <h3>🏨 Kies een hotel als je:</h3>
        <ul>
          <li>Maximaal comfort en luxe zoekt</li>
          <li>Slechts 1-2 keer per jaar reist</li>
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
              "Tot 70% goedkoper dan hotels over meerdere jaren",
              "Totale vrijheid in locatie en planning",
              "In 2 minuten op- en afgebouwd",
              "Unieke natuurervaring voor het hele gezin",
              "Milieuvriendelijker dan hotelovernachtingen",
              "Geen last-minute prijsopslag in hoogseizoen",
              "Huisdieren altijd welkom",
            ]}
            cons={[
              "Eenmalige investering van €1.500-€3.000",
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
        
        <blockquote>
          "Na 3 jaar hotels boeken voor onze zomervakanties, zijn we overgestapt op een daktent. 
          Eerste jaar: €2.800 bespaard. Onze kinderen vinden het geweldig."
          <br /><strong>— Sandra & Jeroen, Amersfoort (januari 2025)</strong>
        </blockquote>

        <blockquote>
          "Ik was sceptisch over het comfort, maar de matras in mijn Thule Tepui is beter dan menig hotelbed. 
          Wakker worden met uitzicht op de bergen — onbetaalbaar."
          <br /><strong>— Pieter, 45, Breda (februari 2025)</strong>
        </blockquote>

        <blockquote>
          "We combineren het: doordeweeks hotels voor de stad, weekenden de daktent voor natuur. 
          Beste van beide werelden."
          <br /><strong>— Lisa, 32, Amsterdam (maart 2025)</strong>
        </blockquote>
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
            { q: "Is een daktent echt goedkoper dan een hotel?", a: "Ja, bij meer dan 15-25 overnachtingen per jaar is een daktent significant goedkoper. De eenmalige investering (€1.500-€3.000) verdien je snel terug doordat je geen hotelkosten meer hebt." },
            { q: "Hoe snel verdient een daktent zich terug?", a: "Bij gemiddelde hotelkosten van €130/nacht en campingkosten van €30/nacht bespaar je €100 per nacht. Een daktent van €2.000 verdient zich dus terug na 20 nachten." },
            { q: "Is een daktent comfortabel genoeg?", a: "Moderne daktenten hebben dikke schuimmatrassen (8-10 cm), goede ventilatie en zijn waterdicht. Het comfort is vergelijkbaar met kamperen in een caravan, maar dan verhoogd en veiliger." },
            { q: "Kan ik een daktent het hele jaar door gebruiken?", a: "Ja, met de juiste uitrusting (slaapzak voor lage temperaturen, extra isolatie) kun je ook in herfst en winter kamperen. Veel gebruikers kamperen van maart tot november." },
            { q: "Wat zijn de verborgen kosten van een daktent?", a: "Naast de aanschaf moet je rekening houden met dakdragers (€200-€500), jaarlijks onderhoud (€50-€100), en eventuele stalling (€0-€50/maand). Deze kosten zijn alsnog veel lager dan hotelkosten." },
            { q: "Past een daktent op elke auto?", a: "De meeste daktenten passen op auto's met een dakdraagvermogen van minimaal 50-75 kg. SUV's, crossovers en stationwagens zijn ideaal. Check altijd het dynamisch daklaadvermogen van je auto." },
          ]} />
        </div>
      </section>

      {/* Verdict */}
      <section id="verdict">
        <h2>Eindoordeel: Daktent vs Hotel in 2025</h2>
        
        <div className="not-prose my-6 p-6 rounded-xl bg-primary/5 border border-primary/15">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⭐</span>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">8.5 / 10</p>
              <p className="text-sm text-muted-foreground">Daktent als hotel-alternatief</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Voor iedereen die meer dan 15 nachten per jaar op reis gaat, is een daktent de financieel slimmere keuze. 
            Je bespaart duizenden euro's, geniet van meer vrijheid en biedt je gezin unieke avonturen in de natuur. 
            Hotels blijven ideaal voor stedentrips en luxe-momenten, maar voor de meeste vakanties wint de daktent het op bijna alle fronten.
          </p>
        </div>

        <p>
          <strong>Onze aanbeveling:</strong> Bereken je persoonlijke besparing met onze{" "}
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
