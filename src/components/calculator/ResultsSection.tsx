import { CalculatorResults, CalculatorInputs } from "@/lib/calculator";
import { CostChart } from "./CostChart";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Leaf, Share2 } from "lucide-react";

interface ResultsSectionProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
  onShare: () => void;
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

function HeroResult({ results, inputs }: { results: CalculatorResults; inputs: CalculatorInputs }) {
  const isPositive = results.totalSavings > 0;
  const breakEvenYears = results.breakEvenMonths / 12;

  return (
    <motion.div
      key={results.totalSavings}
      initial={{ scale: 0.98, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={isPositive ? "card-result p-6 md:p-8" : results.totalSavings > -500 ? "card-warning p-6 md:p-8" : "card-danger p-6 md:p-8"}
    >
      <div className="text-center space-y-4">
        <div className="text-4xl">{isPositive ? "🎉" : "⚠️"}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Break-even na</p>
          <p className="number-hero text-foreground animate-count-up">
            {results.breakEvenTrips > 200 ? "200+" : results.breakEvenTrips} <span className="text-2xl font-bold">nachten</span>
          </p>
          {results.breakEvenTrips <= 200 && (
            <p className="text-sm text-muted-foreground mt-1">
              ≈ {breakEvenYears.toFixed(1)} jaar bij {inputs.nightsPerYear} nachten/jaar
            </p>
          )}
        </div>
        <div className="h-px bg-border" />
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Totale {isPositive ? "besparing" : "meerkosten"} na {inputs.years} jaar
          </p>
          <p className={`number-hero animate-count-up ${isPositive ? "text-accent" : "text-danger"}`}>
            {isPositive ? "+" : ""}{formatEuro(results.totalSavings)}
          </p>
        </div>
        {isPositive && results.savingsMultiplier >= 1.5 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            Je daktent heeft zichzelf {results.savingsMultiplier.toFixed(1)}x terugverdiend!
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SmartInsight({ results, inputs }: { results: CalculatorResults; inputs: CalculatorInputs }) {
  const breakEvenYears = results.breakEvenMonths / 12;
  const isPeterPenthouse = inputs.tentPrice === 2495;

  if (isPeterPenthouse && results.totalSavings > 0) {
    return (
      <div className="card-elevated p-5 border-l-4 border-l-primary">
        <p className="text-sm font-semibold text-foreground mb-1">✅ Peter Penthouse keuze</p>
        <p className="text-sm text-muted-foreground">
          Met zonnepaneel bespaar je extra €150/jaar op campsite elektriciteit! 
          Je verdient de investering terug in {breakEvenYears.toFixed(1)} jaar.
        </p>
      </div>
    );
  }

  if (breakEvenYears < 2) {
    return (
      <div className="card-elevated p-5 border-l-4 border-l-accent">
        <p className="text-sm font-semibold text-foreground mb-1">💡 Uitstekende ROI!</p>
        <p className="text-sm text-muted-foreground">
          Met {inputs.nightsPerYear} nachten per jaar heb je in {(results.breakEvenMonths).toFixed(0)} maanden je investering terug.
          Na {inputs.years} jaar bespaar je {formatEuro(results.totalSavings)}!
        </p>
      </div>
    );
  }

  if (breakEvenYears <= 4) {
    return (
      <div className="card-elevated p-5 border-l-4 border-l-primary">
        <p className="text-sm font-semibold text-foreground mb-1">✅ Solide investering</p>
        <p className="text-sm text-muted-foreground">
          Je daktent verdient zichzelf terug in {breakEvenYears.toFixed(1)} jaar.
          Overweeg een voorjaarstrip erbij voor sneller rendement.
        </p>
      </div>
    );
  }

  const nightsFor3YearBreakeven = Math.ceil((inputs.tentPrice + inputs.roofRackPrice) / 
    ((inputs.hotelPricePerNight + inputs.hotelFoodPerDay + inputs.hotelParkingPerDay + inputs.touristTaxPerNight) - 
     (inputs.campsitePricePerNight + inputs.tentFoodPerDay + inputs.extraFuelPerNight)) / 3);

  return (
    <div className="card-elevated p-5 border-l-4 border-l-warning">
      <p className="text-sm font-semibold text-foreground mb-1">⚠️ Let op</p>
      <p className="text-sm text-muted-foreground">
        Met {inputs.nightsPerYear} nachten per jaar duurt terugverdienen {breakEvenYears.toFixed(1)} jaar.
        Verhoog naar {nightsFor3YearBreakeven > 0 ? nightsFor3YearBreakeven : "meer"} nachten voor break-even in 3 jaar,
        of overweeg een budget daktent (€1.200).
      </p>
    </div>
  );
}

function CostBreakdownCard({ title, emoji, breakdown, color }: {
  title: string; emoji: string; breakdown: { items: { label: string; amount: number }[]; total: number }; color: "primary" | "accent";
}) {
  return (
    <div className="card-elevated p-5">
      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h4>
      <div className="space-y-2">
        {breakdown.items.filter(i => i.amount > 0).map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-foreground">{formatEuro(item.amount)}</span>
          </div>
        ))}
        <div className="h-px bg-border my-2" />
        <div className="flex justify-between text-sm font-bold">
          <span className="text-foreground">TOTAAL</span>
          <span className={color === "accent" ? "text-accent" : "text-primary"}>{formatEuro(breakdown.total)}</span>
        </div>
      </div>
    </div>
  );
}

export function ResultsSection({ results, inputs, onShare }: ResultsSectionProps) {
  return (
    <div className="space-y-5">
      <HeroResult results={results} inputs={inputs} />
      
      <SmartInsight results={results} inputs={inputs} />

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CostBreakdownCard title="Daktent Route" emoji="🏕️" breakdown={results.daktentBreakdown} color="accent" />
        <CostBreakdownCard title="Hotel/Airbnb Route" emoji="🏨" breakdown={results.hotelBreakdown} color="primary" />
      </div>

      {/* Difference callout */}
      <div className={`p-4 rounded-xl text-center font-bold text-lg ${results.totalSavings > 0 ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"}`}>
        💰 VERSCHIL: {formatEuro(Math.abs(results.totalSavings))} {results.totalSavings > 0 ? "BESPAARD" : "DUURDER"} met daktent
      </div>

      {/* Chart */}
      <div className="card-elevated p-5">
        <h4 className="section-header">📊 Visuele Vergelijking</h4>
        <CostChart yearlyBreakdown={results.yearlyBreakdown} />
      </div>

      {/* Environmental */}
      <div className="card-elevated p-5">
        <h4 className="section-header">🌍 Milieu Impact</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-xl bg-accent/5">
            <Leaf className="w-6 h-6 text-accent mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{results.co2Savings}kg</p>
            <p className="text-xs text-muted-foreground">CO₂ besparing</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-accent/5">
            <span className="text-2xl">♻️</span>
            <p className="text-2xl font-bold text-foreground">{results.plasticSavings}</p>
            <p className="text-xs text-muted-foreground">Hotel flesjes vermeden</p>
          </div>
        </div>
      </div>

      {/* Affiliate CTA */}
      {results.totalSavings > 0 && (
        <a
          href="https://www.peter-penthouse.com/?ref=calculator"
          target="_blank" rel="noopener noreferrer"
          className="block card-elevated p-5 border-2 border-primary/20 hover:border-primary/40 transition-all group"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Klaar voor je daktent? Bekijk Peter Penthouse →
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ✓ Solar panel = €150/jaar besparing · ✓ Compact = minder brandstof · ✓ Premium matras
              </p>
            </div>
          </div>
        </a>
      )}

      {/* Share button */}
      <button
        onClick={onShare}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md"
      >
        <Share2 className="w-4 h-4" />
        📤 Deel Je Resultaten
      </button>
    </div>
  );
}
