export const SITE_URL = "https://daktentroicalculator.online";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  summary: string;
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
  },
  {
    path: "/daktent-vs-camper",
    title: "Daktent vs camper: eerlijke vergelijking op kosten en gemak",
    description: "Daktent of camper? Vergelijk kosten, gemak en flexibiliteit en ontdek wat bij jou past, met een eerlijke analyse en de calculator.",
    canonical: `${SITE_URL}/daktent-vs-camper`,
    h1: "Daktent vs Camper",
    summary: "Wanneer een daktent zich terugverdient tegenover camperhuur, hangt af van jouw prijzen en hoe vaak je gaat. Reken het uit met de calculator. De keuze tussen een daktent en een camper gaat verder dan alleen geld. Het gaat om lifestyle, comfort, flexibiliteit en wat je belangrijk vindt op reis.",
  },
  {
    path: "/peter-penthouse-daktent",
    title: "Peter Penthouse daktent: review, prijs en kosten per nacht",
    description: "Peter Penthouse daktent: €1.800 ophalen, €1.950 bezorgd. Specificaties, wat erbij zit, huren of kopen en wat hij per nacht kost, uitgerekend met onze calculator.",
    canonical: `${SITE_URL}/peter-penthouse-daktent`,
    h1: "Peter Penthouse daktent",
    summary: "De Peter Penthouse is een semi-hardshell daktent van een kleine Nederlandse verkoper uit Soerendonk. Hij kost € 1.800 opgehaald of € 1.950 bezorgd, en dat is inclusief 60W zonnepaneel, powerbank, 6 cm matras, ladder en luifel. Bij 20 nachten per jaar kost de tent je, met dakdragers en onderhoud erbij, ongeveer € 25,50 per nacht over vijf jaar. Eerlijk vooraf: wij hebben deze tent niet zelf getest.",
  },
  {
    path: "/daktent-huren-of-kopen",
    title: "Daktent huren of kopen? Rekenhulp: wanneer is kopen goedkoper",
    description: "Vergelijk daktent huren en kopen met je eigen reisplannen, huurprijs, aanschaf, dakdragers, stalling en verkoopwaarde. Bereken jouw omslagpunt.",
    canonical: `${SITE_URL}/daktent-huren-of-kopen`,
    h1: "Daktent huren of kopen? Reken uit wanneer kopen goedkoper is",
    summary: "Huren is goedkoper als je weinig gaat. Kopen wint vanaf een bepaald aantal reizen. De rekenhulp hieronder rekent jouw omslagpunt uit.",
  },
];

export function getRouteMeta(path: string): RouteMeta {
  const meta = routesMeta.find(route => route.path === path);
  if (!meta) throw new Error(`Missing SEO metadata for ${path}`);
  return meta;
}