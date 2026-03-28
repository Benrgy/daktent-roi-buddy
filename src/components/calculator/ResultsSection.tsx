import { useState } from "react";
import { trackPeterPenthouseClick } from "@/lib/analytics";
import { CalculatorResults, CalculatorInputs, ScenarioResult } from "@/lib/calculator";
import { CostChart } from "./CostChart";
import { SavingsChart } from "./SavingsChart";
import { ShareImageButton } from "./ShareImageGenerator";
import { PdfExportButton } from "./PdfExport";
import { motion } from "framer-motion";
import { TrendingUp, Leaf, Share2 } from "lucide-react";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface ResultsSectionProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
  onShare: () => void;
}

type ScenarioTab = "hotel" | "camper" | "caravan";

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

function HeroResult({ savings, breakEvenTrips, breakEvenMonths, savingsMultiplier, nightsPerYear, years }: {
  savings: number; breakEvenTrips: number; breakEvenMonths: number; savingsMultiplier: number; nightsPerYear: number; years: number;
}) {
  const isPositive = savings > 0;
  const breakEvenYears = breakEvenMonths / 12;
  const animatedTrips = useAnimatedNumber(breakEvenTrips > 200 ? 200 : breakEvenTrips);
  const animatedSavings = useAnimatedNumber(savings);

  return (
    <motion.div
      key={`${savings}-${breakEvenTrips}`}
      initial={{ scale: 0.96, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={isPositive ? "card-result p-6 md:p-8" : savings > -500 ? "card-warning p-6 md:p-8" : "card-danger p-6 md:p-8"}
    >
      <div className="text-center space-y-4">
        <div className="text-4xl">{isPositive ? "🎉" : "⚠️"}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Break-even na</p>
          <p className="number-hero text-foreground">
            {animatedTrips}{breakEvenTrips > 200 ? "+" : ""} <span className="text-2xl font-bold">nachten</span>
          </p>
          {breakEvenTrips <= 200 && (
            <p className="text-sm text-muted-foreground mt-1">
              ≈ {breakEvenYears.toFixed(1)} jaar bij {nightsPerYear} nachten/jaar
            </p>
          )}
        </div>
        <div className="h-px bg-border" />
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Totale {isPositive ? "besparing" : "meerkosten"} na {years} jaar
          </p>
          <p className={`number-hero ${isPositive ? "text-primary" : "text-danger"}`}>
            {isPositive ? "+" : ""}{formatEuro(animatedSavings)}
          </p>
        </div>
        {isPositive && savingsMultiplier >= 1.5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold"
          >
            <TrendingUp className="w-4 h-4" />
            Je daktent heeft zichzelf {savingsMultiplier.toFixed(1)}x terugverdiend!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function SmartInsight({ results, inputs }: { results: CalculatorResults; inputs: CalculatorInputs }) {
  const breakEvenYears = results.breakEvenMonths / 12;
  const isPeterPenthouse = inputs.tentPrice === 1749;

  if (isPeterPenthouse && results.totalSavings > 0) {
    const fuelSaving = Math.round(inputs.nightsPerYear * inputs.extraFuelPerNight * 0.08 * inputs.years);
    const solarSaving = 150 * inputs.years;
    return (
      <div className="card-elevated p-5 border-l-4 border-l-primary">
        <p className="text-sm font-semibold text-foreground mb-1">✅ Slimme keuze: Peter Penthouse</p>
        <p className="text-sm text-muted-foreground mb-2">
          Compact ontwerp = <strong>8% minder brandstof</strong> (besparing ~{formatEuro(fuelSaving)} over {inputs.years} jaar). 
          Ingebouwd 60W zonnepaneel bespaart <strong>{formatEuro(solarSaving)}</strong> op campingstroom. 
          Totale investering terug in {breakEvenYears.toFixed(1)} jaar.
        </p>
        <a
          href="https://www.peter-penthouse.com/?ref=calculator"
          target="_blank" rel="noopener noreferrer"
          onClick={() => trackPeterPenthouseClick('smart_insight')}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Bekijk de Peter Penthouse →
        </a>
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
          <span className={color === "accent" ? "text-primary" : "text-accent"}>{formatEuro(breakdown.total)}</span>
        </div>
      </div>
    </div>
  );
}

const scenarioTabs: { key: ScenarioTab; label: string; emoji: string }[] = [
  { key: "hotel", label: "vs Hotel", emoji: "🏨" },
  { key: "camper", label: "vs Camper Huur", emoji: "🚐" },
  { key: "caravan", label: "vs Caravan", emoji: "🏠" },
];

export function ResultsSection({ results, inputs, onShare }: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState<ScenarioTab>("hotel");

  // Get current scenario data based on tab
  const getScenarioData = () => {
    if (activeTab === "hotel") {
      return {
        savings: results.totalSavings,
        breakEvenTrips: results.breakEvenTrips,
        breakEvenMonths: results.breakEvenMonths,
        savingsMultiplier: results.savingsMultiplier,
        yearlyBreakdown: results.yearlyBreakdown,
        daktentBreakdown: results.daktentBreakdown,
        altBreakdown: results.hotelBreakdown,
        altLabel: "Hotel/Airbnb Route",
        altEmoji: "🏨",
      };
    }
    const scenario = results.scenarios[activeTab === "camper" ? 0 : 1];
    return {
      savings: scenario.totalSavings,
      breakEvenTrips: scenario.breakEvenTrips,
      breakEvenMonths: scenario.breakEvenMonths,
      savingsMultiplier: scenario.savingsMultiplier,
      yearlyBreakdown: scenario.yearlyBreakdown,
      daktentBreakdown: scenario.daktentBreakdown,
      altBreakdown: scenario.altBreakdown,
      altLabel: `${scenario.altLabel} Route`,
      altEmoji: scenario.altEmoji,
    };
  };

  const data = getScenarioData();

  return (
    <div className="space-y-5">
      {/* Scenario Tabs */}
      <div className="flex rounded-xl bg-secondary p-1 gap-1">
        {scenarioTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="mr-1">{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.replace("vs ", "")}</span>
          </button>
        ))}
      </div>

      <HeroResult
        savings={data.savings}
        breakEvenTrips={data.breakEvenTrips}
        breakEvenMonths={data.breakEvenMonths}
        savingsMultiplier={data.savingsMultiplier}
        nightsPerYear={inputs.nightsPerYear}
        years={inputs.years}
      />
      
      {activeTab === "hotel" && <SmartInsight results={results} inputs={inputs} />}

      {/* Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <CostBreakdownCard title="Daktent Route" emoji="🏕️" breakdown={data.daktentBreakdown} color="accent" />
        <CostBreakdownCard title={data.altLabel} emoji={data.altEmoji} breakdown={data.altBreakdown} color="primary" />
      </motion.div>

      {/* Difference callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`p-4 rounded-xl text-center font-bold text-lg ${data.savings > 0 ? "bg-primary/10 text-primary" : "bg-danger/10 text-danger"}`}
      >
        💰 VERSCHIL: {formatEuro(Math.abs(data.savings))} {data.savings > 0 ? "BESPAARD" : "DUURDER"} met daktent
      </motion.div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card-elevated p-5">
        <h4 className="section-header">📊 Visuele Vergelijking</h4>
        <CostChart yearlyBreakdown={data.yearlyBreakdown} altLabel={activeTab === "hotel" ? "Hotel" : activeTab === "camper" ? "Camper" : "Caravan"} />
      </motion.div>

      {/* Savings Line Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="card-elevated p-5">
        <h4 className="section-header">📈 Cumulatieve Besparing</h4>
        <SavingsChart yearlyBreakdown={data.yearlyBreakdown} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card-elevated p-5">
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
      </motion.div>

      {/* Affiliate CTA */}
      {results.totalSavings > 0 && (
        <a
          href="https://www.peter-penthouse.com/?ref=calculator"
          target="_blank" rel="noopener noreferrer"
          onClick={() => trackPeterPenthouseClick('results_cta')}
          className="block rounded-2xl p-5 md:p-6 border-2 border-primary/20 hover:border-primary/40 bg-gradient-to-r from-card to-primary/5 transition-all group shadow-sm hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">⭐</span>
            <div className="flex-1">
              <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                Je bespaart {formatEuro(results.totalSavings)} — investeer het slim
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Elke nacht zonder daktent kost je {formatEuro(Math.round((results.hotelBreakdown.total - results.daktentBreakdown.total) / (inputs.nightsPerYear * inputs.years)))} extra. 
                De Peter Penthouse verdient zichzelf terug.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>☀️ 60W zonnepaneel + powerbank</span>
                <span>🛏️ 6 cm premium matras</span>
                <span>📦 Compleet pakket, geen upsells</span>
                <span>⛽ 8% minder brandstof</span>
              </div>
              <p className="text-sm font-bold text-primary mt-3 group-hover:underline">
                Bekijk de Peter Penthouse → €2.495 compleet
              </p>
            </div>
          </div>
        </a>
      )}

      {/* Share image generator */}
      <ShareImageButton results={results} inputs={inputs} />

      {/* PDF Export */}
      <PdfExportButton results={results} inputs={inputs} />

      {/* Share button */}
      <button
        onClick={onShare}
        className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
      >
        <Share2 className="w-4 h-4" />
        📤 Deel Via WhatsApp/Email
      </button>
    </div>
  );
}
