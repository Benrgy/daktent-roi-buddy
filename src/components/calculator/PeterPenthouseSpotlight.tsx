import { motion } from "framer-motion";
import { Sun, BedDouble, Package, Maximize2, Shield, Fuel } from "lucide-react";
import { trackPeterPenthouseClick } from "@/lib/analytics";

const usps = [
  {
    icon: Sun,
    title: "Off-Grid Klaar",
    desc: "60W zonnepaneel + 20.000 mAh powerbank — standaard inbegrepen. Geen campingstroom nodig, bespaar €150/jaar.",
    highlight: "€150/jaar besparing",
  },
  {
    icon: BedDouble,
    title: "Premium Matras",
    desc: "6 cm dik: 3 cm memory foam + 3 cm high-density foam. Het dikste matras dat fysiek past — comfortabel genoeg voor weken achter elkaar.",
    highlight: "6 cm premium",
  },
  {
    icon: Package,
    title: "Compleet Pakket",
    desc: "Matras, ladder, beschermhoes, montagebeugels, handleiding, zonnepaneel én powerbank. Geen upsells, geen verborgen kosten.",
    highlight: "Alles inbegrepen",
  },
  {
    icon: Maximize2,
    title: "Compact & Ruim",
    desc: "Ingeklapt nauwelijks windgeruis en minder brandstof. Uitgeklapt ruim voor twee personen met 2 panoramische dakramen.",
    highlight: "8% minder brandstof",
  },
];

export function PeterPenthouseSpotlight() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="p-6 md:p-8 pb-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Aanbevolen
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                <Fuel className="w-3.5 h-3.5" /> Bespaar op brandstof
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Peter Penthouse Daktent
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
              Combineer het gemak van een auto met het comfort van een camper. Ontworpen na uitgebreide 
              fabrieksbezoeken in China — geen compromissen, alleen wat écht werkt.
            </p>
          </div>

          {/* USP Grid */}
          <div className="p-6 md:p-8 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usps.map((usp, i) => (
                <motion.div
                  key={usp.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-border/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <usp.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-0.5">{usp.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{usp.desc}</p>
                    <span className="inline-block mt-1.5 text-xs font-semibold text-primary">{usp.highlight}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Price Anchor + CTA */}
          <div className="p-6 md:p-8 pt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-primary/5 border border-primary/15">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-3xl font-black text-foreground">€2.495</span>
                  <span className="text-sm text-muted-foreground line-through">€3.500+</span>
                  <span className="text-xs font-semibold text-primary">premium merken</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compleet pakket — geen verborgen kosten. Duurzaam gebouwd met 320 GSM anti-rip canvas en aluminium frame.
                </p>
              </div>
              <a
                href="https://www.peter-penthouse.com/?ref=calculator"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPeterPenthouseClick('spotlight_cta')}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Bekijk Peter Penthouse →
              </a>
            </div>
          </div>

          {/* Social proof */}
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <p className="text-xs text-muted-foreground text-center">
              ✓ Geen hydrauliek — betrouwbaar · ✓ RVS hardware — roestvrij · ✓ Plug & play — direct klaar · ✓ Steeds populairder onder Nederlandse reizigers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
