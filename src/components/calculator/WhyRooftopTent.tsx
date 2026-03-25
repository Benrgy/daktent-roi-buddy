import { motion } from "framer-motion";
import { Compass, PiggyBank, Leaf, Timer } from "lucide-react";
import uspFreedom from "@/assets/usp-freedom.jpg";
import uspSavings from "@/assets/usp-savings.jpg";
import uspEco from "@/assets/usp-eco.jpg";
import uspEasy from "@/assets/usp-easy.jpg";

const usps = [
  {
    icon: Compass,
    title: "Totale Vrijheid",
    desc: "Slaap waar je wilt — van bergtoppen tot stranden. Geen reserveringen, geen check-in tijden.",
    img: uspFreedom,
    alt: "Daktent bij zonsondergang op een bergpas",
  },
  {
    icon: PiggyBank,
    title: "Flink Besparen",
    desc: "Na 1-2 seizoenen terugverdiend. Geen hotelprijzen, geen Airbnb-fees meer.",
    img: uspSavings,
    alt: "Spaarvarken voor een tent als symbool van besparing",
  },
  {
    icon: Leaf,
    title: "Duurzaam Reizen",
    desc: "Kleinere CO₂-voetafdruk dan hotels of vliegvakanties. Geniet van de natuur zonder impact.",
    img: uspEco,
    alt: "Daktent in een groen bos bij een rivier",
  },
  {
    icon: Timer,
    title: "60 Sec Opzetten",
    desc: "Klap open, klim omhoog, slaap. Geen gedoe met tentharingen of campingplekken zoeken.",
    img: uspEasy,
    alt: "Persoon zet snel een daktent op bij zonsondergang",
  },
];

export function WhyRooftopTent() {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Waarom een daktent?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Meer dan een tent op je dak
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Een daktent is een investering in vrijheid. Dit is waarom duizenden reizigers de overstap maken.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={usp.img}
                  alt={usp.alt}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-primary/90 text-primary-foreground">
                  <usp.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-1.5">{usp.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{usp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
