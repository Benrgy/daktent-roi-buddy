import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { FAQ } from "@/components/article/FAQ";
import { ProsCons } from "@/components/article/ProsCons";
import { CHECKED, PRICE_DELIVERED, PRICE_PICKUP, PETER_PENTHOUSE_SOURCE, RENTAL_EXAMPLE } from "@/data/prijzen";
import { hurenOfKopen, type HurenOfKopenInputs } from "@/lib/hurenOfKopen";
import heroImg from "@/assets/hero-bg.jpg";
import { getRouteMeta } from "@/seo/routesMeta";
import { useRouteSeo } from "@/seo/useRouteSeo";

const initialInputs: HurenOfKopenInputs = { tripsPerYear: 2, rentPerTrip: RENTAL_EXAMPLE.total, years: 5, purchasePrice: PRICE_DELIVERED, roofRacks: 0, storagePerMonth: 0, resaleValue: 0 };
const tocItems = [
  { id: "intro", label: "Kort antwoord" },
  { id: "rekenhulp", label: "Jouw omslagpunt" },
  { id: "huren", label: "Wanneer huren slim is" },
  { id: "kopen", label: "Wanneer kopen slim is" },
  { id: "auto", label: "Past hij op jouw auto?" },
  { id: "faq", label: "Veelgestelde vragen" },
];
const faqItems = getRouteMeta("/daktent-huren-of-kopen").faq ?? [];
const euro = (value: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const number = (value: number) => new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 2 }).format(value);

const fields: { key: keyof HurenOfKopenInputs; label: string; help?: string }[] = [
  { key: "tripsPerYear", label: "Aantal reizen per jaar" },
  { key: "rentPerTrip", label: "Huurkosten per reis (€), inclusief eventuele dakdragers" },
  { key: "years", label: "Aantal jaren dat je de tent gebruikt" },
  { key: "purchasePrice", label: "Aanschafprijs daktent (€)" },
  { key: "roofRacks", label: "Aanschaf dakdragers (€)", help: "Als je die nog niet hebt." },
  { key: "storagePerMonth", label: "Stallingskosten per maand (€)" },
  { key: "resaleValue", label: "Verwachte verkoopwaarde aan het eind (€)", help: "Tweedehands verkopen kan een deel terugverdienen; vul alleen een bedrag in als je een reëel verkoopbedrag weet." },
];

export default function DaktentHurenOfKopen() {
  const seo = useRouteSeo("/daktent-huren-of-kopen");
  const [editedFields, setEditedFields] = useState<string[]>([]);
  const [values, setValues] = useState<Record<keyof HurenOfKopenInputs, string>>(() => Object.fromEntries(Object.entries(initialInputs).map(([key, value]) => [key, String(value)])) as Record<keyof HurenOfKopenInputs, string>);
  const inputs = useMemo(() => Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim() === "" ? NaN : Number(value)])) as unknown as HurenOfKopenInputs, [values]);
  const result = useMemo(() => hurenOfKopen(inputs), [inputs]);

  return (
    <ArticleLayout title={seo.h1} subtitle="Jouw reisplannen, jouw kosten, jouw omslagpunt." heroImage={heroImg} heroAlt="Daktent bij zonsondergang in de bergen (sfeerbeeld)" tocItems={tocItems} publishDate="Oktober 2026" readTime="Variabele" breadcrumbLabel="Daktent huren of kopen">
      <section id="intro">
        <h2>Kort antwoord</h2>
        <p>Huren is goedkoper als je weinig gaat. Kopen wint vanaf een bepaald aantal reizen. De rekenhulp hieronder rekent jouw omslagpunt uit.</p>
      </section>

      <section id="rekenhulp">
        <h2>Wanneer wordt kopen goedkoper voor jou?</h2>
        <div className="not-prose my-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map(field => (
              <div key={field.key} className={field.key === "resaleValue" ? "sm:col-span-2" : ""}>
                <label htmlFor={`rent-buy-${field.key}`} className="block text-sm font-semibold text-foreground mb-2">{field.label}</label>
                {!["tripsPerYear", "years"].includes(field.key) && !editedFields.includes(field.key) && <p className="text-xs text-muted-foreground mb-2">voorbeeldwaarde</p>}
                <input id={`rent-buy-${field.key}`} type="number" min={field.key === "years" ? "1" : "0"} step={field.key === "years" || field.key === "tripsPerYear" ? "1" : "0.01"} value={values[field.key]} onChange={event => { setEditedFields(previous => [...new Set([...previous, field.key])]); setValues(previous => ({ ...previous, [field.key]: event.target.value })); }} aria-describedby={field.help || field.key === "rentPerTrip" || field.key === "purchasePrice" ? `help-${field.key}` : undefined} className="w-full rounded-lg border border-input bg-card px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                {field.help && <p id={`help-${field.key}`} className="mt-2 text-xs leading-relaxed text-muted-foreground">{field.help}</p>}
                {field.key === "rentPerTrip" && <p id="help-rentPerTrip" className="mt-2 text-xs leading-relaxed text-muted-foreground">Voorbeeld: Daktrail rekent voor de Peter Penthouse EUR {RENTAL_EXAMPLE.dailyPrice} per dag voor dag 1 t/m {RENTAL_EXAMPLE.days}, dus {RENTAL_EXAMPLE.days} dagen = EUR {RENTAL_EXAMPLE.total} (prijs gecontroleerd {RENTAL_EXAMPLE.checked}, <a className="text-primary underline" href={RENTAL_EXAMPLE.source} target="_blank" rel="noopener noreferrer">daktrail.nl/huurprijzen</a>). Vraag bij jouw verhuurder de totaalprijs voor je reis.</p>}
                {field.key === "purchasePrice" && <p id="help-purchasePrice" className="mt-2 text-xs leading-relaxed text-muted-foreground">Voorbeeld: Peter Penthouse EUR {number(PRICE_DELIVERED)} bezorgd, EUR {number(PRICE_PICKUP)} ophalen, <a className="text-primary underline" href={PETER_PENTHOUSE_SOURCE} target="_blank" rel="noopener noreferrer">peter-penthouse.com</a>, {CHECKED}.</p>}
              </div>
            ))}
          </div>

          {editedFields.length === 0 && <p className="text-sm text-muted-foreground">Voorbeeld met standaardwaarden. Vul je eigen prijzen in voor jouw uitkomst.</p>}
          {result ? <>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5">
              {[
                ["Huren totaal", euro(result.rentTotal)],
                ["Kopen totaal", euro(result.buyTotal)],
                [result.difference === 0 ? "Geen verschil" : `Verschil in het voordeel van ${result.difference > 0 ? "kopen" : "huren"}`, euro(Math.abs(result.difference))],
                ["Kosten per reis bij kopen", result.buyPerTrip === null ? "Geen reizen ingevuld" : euro(result.buyPerTrip)],
                ["Omslagpunt in reizen totaal", result.breakEvenTrips === null ? "Niet berekenbaar bij gratis huur" : number(result.breakEvenTrips)],
                ["Omslagpunt per jaar", result.breakEvenPerYear === null ? "Niet berekenbaar bij gratis huur" : number(result.breakEvenPerYear)],
              ].map(([label, value]) => <div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 text-xl font-bold text-foreground tabular-nums">{value}</dd></div>)}
            </dl>
            <div role="status" className="space-y-2 text-sm text-foreground">
              {result.breakEvenTrips !== null && result.breakEvenPerYear !== null && result.firstCheaperTrip !== null ? <>
                <p>Bij jouw invoer is kopen goedkoper vanaf {result.firstCheaperTrip} reizen in {number(inputs.years)} jaar (ongeveer {number(result.firstCheaperTrip / inputs.years)} per jaar).</p>
                <p className="text-muted-foreground">Het exacte omslagpunt is {number(result.breakEvenTrips)} reizen totaal ({number(result.breakEvenPerYear)} per jaar). Op het omslagpunt zijn de kosten gelijk; daarboven is kopen goedkoper.</p>
              </> : <p>{result.buyTotal < 0 ? "Bij jouw invoer zijn de netto koopkosten lager dan de gratis huurkosten." : "Bij gratis huur is er geen omslagpunt waarop kopen goedkoper wordt."}</p>}
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground mb-3">Cumulatieve kosten per jaar</h3>
              <div className="h-72 w-full" role="img" aria-label="Lijngrafiek van cumulatieve kosten huren en kopen per jaar">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.yearlyCosts} margin={{ top: 10, right: 12, bottom: 10, left: 0 }}>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={value => `Jaar ${value}`} />
                    <YAxis width={65} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={value => `€${number(value)}`} />
                    <Tooltip formatter={(value: number) => euro(value)} labelFormatter={value => `Jaar ${value}`} />
                    <Legend />
                    <Line type="linear" dataKey="rent" name="Huren" stroke="hsl(var(--accent))" strokeWidth={2} isAnimationActive={false} />
                    <Line type="linear" dataKey="buy" name="Kopen" stroke="hsl(var(--primary))" strokeWidth={2} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Kopen begint met aanschaf en dakdragers. Stalling telt elk jaar mee; verkoopwaarde wordt alleen aan het eind afgetrokken.</p>
            </div>
          </> : <p role="alert" className="text-sm text-danger">Vul alle velden in met geldige, niet-negatieve bedragen en een gebruiksperiode groter dan nul.</p>}
        </div>
      </section>

      <section id="huren"><h2>Wanneer is huren slim</h2><p>Huren past bij onzekere reisplannen of als je eerst wilt testen of een daktent bij je past.</p><ProsCons pros={["Testen of een daktent bij je past", "Geen opslagruimte thuis nodig", "Geen aanschaf voordat je reisplannen vaststaan"]} cons={["Beschikbaarheid hangt af van de verhuurder", "Voor elke reis ophalen en terugbrengen", "Dakdragers voor jouw auto vooraf afstemmen"]} /></section>
      <section id="kopen"><h2>Wanneer is kopen slim</h2><p>Kopen past bij vaste reisplannen en als je thuis ruimte hebt om de tent op te slaan.</p><ProsCons pros={["Je eigen tent beschikbaar voor je reisplannen", "Een vertrouwde uitrusting voor terugkerende reizen", "Dakdragers passend bij jouw auto uitzoeken"]} cons={["Opslagruimte thuis of betaalde stalling nodig", "De aanschaf betaal je vooraf", "Zelf verantwoordelijk voor onderhoud en verkoop"]} /></section>
      <section id="auto"><h2>Past een daktent op jouw auto?</h2><p>Controleer de maximale dakbelasting in het instructieboekje van je auto en tel het gewicht van tent en dakdragers op.</p></section>
      <section id="faq"><h2>Veelgestelde vragen over huren of kopen</h2><FAQ items={faqItems} /></section>
    </ArticleLayout>
  );
}