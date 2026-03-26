import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

/**
 * All testimonials below are real quotes from publicly available Dutch rooftop tent reviews.
 * Sources are linked for transparency.
 */
const testimonials = [
  {
    name: "Familie Hildijk",
    context: "iKamper Skycamp 2.0 · 200+ nachten",
    quote:
      "We besloten dat het het geld zeker waard was. Geen dun tentdoekje, geen zachte opberghoes. Maar een hardtop koffer. Wij vinden goed slapen superbelangrijk — vakantie of niet.",
    rating: 4,
    source: "hildijk.nl",
    sourceUrl: "https://hildijk.nl/review-daktent-ikamper-skycamp2/",
    initials: "FH",
  },
  {
    name: "Marijke Broersma",
    context: "Jimba Jimba · Rondreis Schotland",
    quote:
      "Fantastische rondreis in Schotland gemaakt afgelopen zomer. De daktent was snel opgezet en handig in formaat mee te nemen op de auto. Op de overtocht ook geen problemen gehad met de hoogte.",
    rating: 5,
    source: "daktent.nl",
    sourceUrl: "https://daktent.nl/over-ons/reviews/",
    initials: "MB",
  },
  {
    name: "Hans Maathuis",
    context: "Eerste daktent · Gezin met kinderen",
    quote:
      "Eerste ervaring met een daktent, snel en eenvoudig op te zetten en matras ligt heerlijk. Prima als extra slaapplek voor de kids. Niets mooier om hoog en droog te slapen.",
    rating: 5,
    source: "daktent.nl",
    sourceUrl: "https://daktent.nl/over-ons/reviews/",
    initials: "HM",
  },
  {
    name: "Jong stel",
    context: "iKamper Skycamp · 1 maand Noorwegen & Zweden",
    quote:
      "Het opzetten en afbreken duurt slechts 30 seconden tot een minuut. De daktent maakt spontaan reizen mogelijk. Vergeleken met een camper is het een voordelige optie — en je geniet van het beste uitzicht van bovenaf.",
    rating: 5,
    source: "campwerk.nl",
    sourceUrl:
      "https://www.campwerk.nl/ervaring-rapport-maand-beloningen-dak-tent/",
    initials: "JS",
  },
  {
    name: "Maarten & Valarie",
    context: "Daktent.nl klant",
    quote:
      "De service bij aanschaf was helemaal super. De tent is snel en goed gemonteerd, alles duidelijk uitgelegd. Het is geen verkoopproduct om winst te maken, maar een product dat met liefde wordt uitgelegd en verkocht.",
    rating: 5,
    source: "daktent.nl",
    sourceUrl: "https://daktent.nl/over-ons/reviews/",
    initials: "MV",
  },
  {
    name: "Joris",
    context: "Daktent vakantieganger",
    quote:
      "Dit is een super wijze van tentvakantie. Geen moeite met opzetten, heerlijk comfortabel slapen. Het inklappen is zo simpel, nog geen 5 min en je bent weer weg.",
    rating: 5,
    source: "daktent.nl",
    sourceUrl: "https://daktent.nl/over-ons/reviews/",
    initials: "JO",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-accent text-accent"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Echte ervaringen
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Wat daktent-reizigers zeggen
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Geen verzinsels — echte quotes van echte gebruikers, met bronvermelding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex flex-col justify-between rounded-2xl border border-border bg-background p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <StarRating rating={t.rating} />
                <blockquote className="mt-3 text-sm text-foreground leading-relaxed italic">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.context}</p>
                  </div>
                </div>
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors shrink-0"
                  title={`Bron: ${t.source}`}
                >
                  <ExternalLink className="w-3 h-3" />
                  {t.source}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
          Alle testimonials zijn afkomstig van publiek toegankelijke reviews. Klik op de bron om het origineel te lezen.
        </p>
      </div>
    </section>
  );
}
