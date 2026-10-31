import { CHECKED, PRICE_PICKUP, PRICE_DELIVERED } from "../data/prijzen";

const euro = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

export const SITE_URL = "https://daktentroicalculator.online";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  summary: string;
  faq?: { q: string; a: string }[];
  staticSections?: { heading: string; text: string }[];
}

export const routesMeta: RouteMeta[] = [
  {
    path: "/",
    title: "Daktent ROI Calculator | Verdient Een Daktent Zich Terug?",
    description: "Bereken in 30 seconden of een daktent financieel slim is. Vergelijk kosten met hotels, Airbnb's, campers en caravans. Gratis, geen account nodig.",
    canonical: `${SITE_URL}/`,
    h1: "Verdient Een Daktent Zich Terug?",
    summary: "Ontdek in 30 seconden of een daktent financieel slim is. Vergelijk met hotels, Airbnb's, campers en caravans.",
  },
  {
    path: "/daktent-vs-hotel",
    title: "Daktent vs hotel: wat is goedkoper? Eerlijke vergelijking",
    description: "Is een daktent goedkoper dan een hotel? Vergelijk kosten, comfort en flexibiliteit in deze eerlijke vergelijking, en reken het uit met de calculator.",
    canonical: `${SITE_URL}/daktent-vs-hotel`,
    h1: "Daktent vs Hotel",
    summary: "Wanneer een daktent zich terugverdient, hangt af van jouw prijzen en hoe vaak je gaat. Reken het uit met de calculator. Vergelijk aanschaf, dakdragers, camping en onderhoud met hotelovernachtingen, eten, parkeren en toeristenbelasting.",
    staticSections: [
      {
        "heading": "Kostenvergelijking: Daktent vs Hotel per Jaar",
        "text": "Vergelijk de kosten met jouw eigen reisplannen en prijzen in de calculator. Vergelijk met jouw eigen prijzen in de calculator. Gebruik onze gratis calculator om jouw persoonlijke besparing te berekenen met jouw eigen reispatroon."
      }
    ],
  },
  {
    path: "/daktent-vs-camper",
    title: "Daktent vs camper: eerlijke vergelijking op kosten en gemak",
    description: "Daktent of camper? Vergelijk kosten, gemak en flexibiliteit en ontdek wat bij jou past, met een eerlijke analyse en de calculator.",
    canonical: `${SITE_URL}/daktent-vs-camper`,
    h1: "Daktent vs Camper",
    summary: "Wanneer een daktent zich terugverdient tegenover camperhuur, hangt af van jouw prijzen en hoe vaak je gaat. Reken het uit met de calculator. De keuze tussen een daktent en een camper gaat verder dan alleen geld. Het gaat om lifestyle, comfort, flexibiliteit en wat je belangrijk vindt op reis.",
    staticSections: [
      {
        "heading": "Daktent of camper: de grote vergelijking",
        "text": "In dit artikel vergelijken we beide opties eerlijk en uitgebreid. Of je nu overweegt om een camper te huren voor je volgende vakantie, of dat je twijfelt over de aanschaf van een daktent — na dit artikel weet je precies wat bij jou past."
      },
      {
        "heading": "Kostenvergelijking: Daktent vs Camper Huren",
        "text": "Vergelijk de kosten met jouw eigen reisplannen en prijzen in de calculator. Vergelijk met jouw eigen prijzen in de calculator. Overweeg je een eigen camper? Neem aanschaf, verzekering, wegenbelasting, onderhoud en stalling mee in je vergelijking. Bereken je eigen besparing →"
      }
    ],
  },
  {
    path: "/peter-penthouse-daktent",
    faq: [
  { q: "Wat kost de Peter Penthouse daktent?", a: `${euro(PRICE_PICKUP)} als je hem ophaalt in Soerendonk (Noord-Brabant), ${euro(PRICE_DELIVERED)} met bezorging in Nederland of België (${euro(150)} verzendkosten). Dat is inclusief zonnepaneel, powerbank, matras, ladder en luifel. Prijzen gecontroleerd op ${CHECKED}.` },
  { q: "Hoe zwaar is de Peter Penthouse?", a: "De tent weegt 62 kg, de ladder 3 kg. Tel daar het gewicht van je dakdragers bij op en vergelijk dat met de dynamische daklast van je auto (te vinden in het instructieboekje)." },
  { q: "Hoe groot is de Peter Penthouse?", a: "Uitgeklapt 190 × 230 × 130 cm, ingeklapt 190 × 115 × 25 cm. Uitgeklapt draagt hij volgens de maker 300 kg." },
  { q: "Kun je de Peter Penthouse huren?", a: "De maker verhuurt zelf niet. Daktrail (Helmond en Gilze) verhuurt hem vanaf €25 per dag, met lagere dagprijzen vanaf dag 11 en dag 16. In vakantieperiodes huur je minimaal 7 dagen, daarbuiten minimaal 4." },
  { q: "Zit er een binnentent of voortent bij?", a: "Nee. Er is één model met één pakket, zonder thermo-binnentent of ondertent. De aanritsbare luifel zit er wel bij. De tent is alleen in zwart verkrijgbaar." },
  { q: "Is de Peter Penthouse direct leverbaar?", a: `Niet direct: op ${CHECKED} meldt de maker dat de tenten van dit jaar verkocht zijn en dat een nieuwe bestelling in november of december geleverd wordt. Bezichtigen in Soerendonk kan op afspraak.` },
  { q: "Heb ik dakdragers nodig?", a: "Ja. De tent gaat op dakdragers, niet rechtstreeks op dakrails. De maker adviseert minimaal ongeveer 70 cm tussen de dragers en dragers met 100 kg draagvermogen voor marge." },
    ],
    title: "Peter Penthouse daktent: review, prijs en kosten per nacht",
    description: "Peter Penthouse daktent: €1.800 ophalen, €1.950 bezorgd. Specificaties, wat erbij zit, huren of kopen en wat hij per nacht kost, uitgerekend met onze calculator.",
    canonical: `${SITE_URL}/peter-penthouse-daktent`,
    h1: "Peter Penthouse daktent",
    summary: "De Peter Penthouse is een semi-hardshell daktent van een kleine Nederlandse verkoper uit Soerendonk. Hij kost € 1.800 opgehaald of € 1.950 bezorgd, en dat is inclusief 60W zonnepaneel, powerbank, 6 cm matras, ladder en luifel. Bij 20 nachten per jaar kost de tent je, met dakdragers en onderhoud erbij, ongeveer € 25,50 per nacht over vijf jaar. Eerlijk vooraf: wij hebben deze tent niet zelf getest.",
    staticSections: [
      {
        "heading": "Peter Penthouse daktent in het kort",
        "text": "De Peter Penthouse is een semi-hardshell daktent van een kleine Nederlandse verkoper uit Soerendonk. Hij kost € 1.800 opgehaald of € 1.950 bezorgd, en dat is inclusief 60W zonnepaneel, powerbank, 6 cm matras, ladder en luifel. Bij 20 nachten per jaar kost de tent je, met dakdragers en onderhoud erbij, ongeveer € 25,50 per nacht over vijf jaar. Eerlijk vooraf: wij hebben deze tent niet zelf getest. Dit is een review op papier. Alle prijzen en specificaties komen van de maker (peter-penthouse.com) en van verhuurder Daktrail, gecontroleerd op 17 oktober 2026. De kosten per nacht rekenen we uit met de calculator van deze site. De foto bovenaan is een sfeerbeeld; de Peter Penthouse zelf is zwart."
      },
      {
        "heading": "Peter Penthouse huren of kopen?",
        "text": "De maker verhuurt zelf niet, maar Daktrail in Helmond en Gilze wel. Prijzen op 17 oktober 2026: Dag 1 tot en met 10: €25,00 per dag Dag 11 tot en met 15: €22,50 per dag Vanaf dag 16: €20,00 per dag Minimale huur: 7 dagen in vakantieperiodes, 4 dagen daarbuiten. Dakdragers huur je er los bij. Vuistregel: bij ongeveer 20 nachten per jaar, vijf jaar lang, kost kopen per nacht (€ 25,50 inclusief dakdragers) ongeveer hetzelfde als huren (€25 per dag zonder dakdragers). Ga je minder vaak, dan is huren goedkoper; ga je vaker, dan wint kopen. Huren is ook een goede manier om te testen of een daktent bij je past voordat je € 1.950 uitgeeft. Een huurkoopregeling is er niet. Bereken met jouw eigen reisplannen en kosten wanneer een daktent kopen goedkoper is dan huren."
      }
    ],
  },
  {
    path: "/daktent-huren-of-kopen",
    faq: [
  { q: "Wanneer is kopen goedkoper dan huren?", a: "Als je totale huurkosten hoger worden dan aanschaf en dakdragers plus stalling, verminderd met je verwachte verkoopwaarde. Het omslagpunt hangt af van jouw invoer." },
  { q: "Welke huurprijs vul ik in?", a: "Vraag je verhuurder de totaalprijs voor jouw reis, inclusief eventuele dakdragers. Vul die totaalprijs in, niet alleen de dagprijs van de tent." },
  { q: "Hoe neem ik verkoopwaarde mee?", a: "Vul alleen een bedrag in als je een reëel verkoopbedrag weet. De rekenhulp trekt dit aan het einde van de gebruiksperiode af van de koopkosten." },
  { q: "Moet ik dakdragers kopen als ik al dakrails heb?", a: "Controleer welke dakdragers geschikt zijn voor jouw auto en de gekozen tent. Dakrails zijn niet hetzelfde als dakdragers. Vraag bij twijfel je leverancier of verhuurder welke bevestiging nodig is." },
    ],
    title: "Daktent huren of kopen? Rekenhulp: wanneer is kopen goedkoper",
    description: "Vergelijk daktent huren en kopen met je eigen reisplannen, huurprijs, aanschaf, dakdragers, stalling en verkoopwaarde. Bereken jouw omslagpunt.",
    canonical: `${SITE_URL}/daktent-huren-of-kopen`,
    h1: "Daktent huren of kopen? Reken uit wanneer kopen goedkoper is",
    summary: "Huren is goedkoper als je weinig gaat. Kopen wint vanaf een bepaald aantal reizen. De rekenhulp hieronder rekent jouw omslagpunt uit.",
    staticSections: [
      {
        "heading": "Wanneer is huren slim",
        "text": "Huren past bij onzekere reisplannen of als je eerst wilt testen of een daktent bij je past. Testen of een daktent bij je past Geen opslagruimte thuis nodig Geen aanschaf voordat je reisplannen vaststaan Beschikbaarheid hangt af van de verhuurder Voor elke reis ophalen en terugbrengen Dakdragers voor jouw auto vooraf afstemmen"
      },
      {
        "heading": "Wanneer is kopen slim",
        "text": "Kopen past bij vaste reisplannen en als je thuis ruimte hebt om de tent op te slaan. Je eigen tent beschikbaar voor je reisplannen Een vertrouwde uitrusting voor terugkerende reizen Dakdragers passend bij jouw auto uitzoeken Opslagruimte thuis of betaalde stalling nodig De aanschaf betaal je vooraf Zelf verantwoordelijk voor onderhoud en verkoop"
      },
      {
        "heading": "Past een daktent op jouw auto?",
        "text": "Controleer de maximale dakbelasting in het instructieboekje van je auto en tel het gewicht van tent en dakdragers op."
      },
      {
        "heading": "Wanneer is kopen goedkoper dan huren?",
        "text": "Als je totale huurkosten hoger worden dan aanschaf en dakdragers plus stalling, verminderd met je verwachte verkoopwaarde. Het omslagpunt hangt af van jouw invoer."
      },
      {
        "heading": "Welke huurprijs vul ik in?",
        "text": "Vraag je verhuurder de totaalprijs voor jouw reis, inclusief eventuele dakdragers. Vul die totaalprijs in, niet alleen de dagprijs van de tent."
      },
      {
        "heading": "Hoe neem ik verkoopwaarde mee?",
        "text": "Vul alleen een bedrag in als je een reëel verkoopbedrag weet. De rekenhulp trekt dit aan het einde van de gebruiksperiode af van de koopkosten."
      },
      {
        "heading": "Moet ik dakdragers kopen als ik al dakrails heb?",
        "text": "Controleer welke dakdragers geschikt zijn voor jouw auto en de gekozen tent. Dakrails zijn niet hetzelfde als dakdragers. Vraag bij twijfel je leverancier of verhuurder welke bevestiging nodig is."
      }
    ],
  },
];

export function getRouteMeta(path: string): RouteMeta {
  const meta = routesMeta.find(route => route.path === path);
  if (!meta) throw new Error(`Missing SEO metadata for ${path}`);
  return meta;
}
export function getFaqSchema(route: RouteMeta) {
  if (!route.faq?.length) return null;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: route.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}
