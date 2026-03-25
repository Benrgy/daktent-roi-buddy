import { useState, useMemo, useEffect } from "react";
import { CalculatorInputs, defaultInputs, presets, calculate } from "@/lib/calculator";
import { PresetButtons } from "@/components/calculator/PresetButtons";
import { InputSection } from "@/components/calculator/InputSection";
import { ResultsSection } from "@/components/calculator/ResultsSection";
import { ShareModal } from "@/components/calculator/ShareModal";
import { EmailCaptureModal } from "@/components/calculator/EmailCaptureModal";
import { ChevronDown, MapPin, Star, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Index() {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const saved = localStorage.getItem("daktent-calc-inputs");
    return saved ? { ...defaultInputs, ...JSON.parse(saved) } : defaultInputs;
  });
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => calculate(inputs), [inputs]);

  useEffect(() => {
    localStorage.setItem("daktent-calc-inputs", JSON.stringify(inputs));
  }, [inputs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("daktent-email-dismissed")) {
        setEmailOpen(true);
      }
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (updates: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }));
    setActivePreset(null);
    setShowResults(true);
  };

  const handlePreset = (key: string) => {
    setActivePreset(key);
    setInputs((prev) => ({ ...prev, ...presets[key].values }));
    setShowResults(true);
  };

  const handleEmailClose = () => {
    setEmailOpen(false);
    localStorage.setItem("daktent-email-dismissed", "true");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero with background image */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Daktent bij zonsondergang in de bergen"
            className="w-full h-full object-cover"
            width={1920}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-md border border-white/10">
              <MapPin className="w-4 h-4" />
              Daktent ROI Calculator
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Verdient Een Daktent<br />
              <span className="text-gradient">Zich Terug?</span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              Ontdek in 30 seconden of een daktent financieel slim is.
              Vergelijk met hotels, Airbnb's, campers en caravans.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/25"
              >
                Start Berekening
                <ChevronDown className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-current text-primary" /> Gratis</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Geen account nodig</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">🏕️ <strong className="text-foreground">3 scenario's</strong> vergelijken</span>
          <span className="flex items-center gap-2">📊 <strong className="text-foreground">Visuele</strong> grafieken</span>
          <span className="flex items-center gap-2">🌍 <strong className="text-foreground">CO₂</strong> impact</span>
          <span className="flex items-center gap-2">⚡ <strong className="text-foreground">30 sec</strong> resultaat</span>
        </div>
      </div>

      {/* Calculator */}
      <main id="calculator" className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* Presets */}
        <div className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Bereken jouw besparing</h2>
          <p className="text-muted-foreground mb-5">Kies een profiel of pas de waarden handmatig aan.</p>
          <PresetButtons onSelect={handlePreset} activePreset={activePreset} />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <InputSection inputs={inputs} onChange={handleChange} />
          </div>
          <div className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start">
            <ResultsSection results={results} inputs={inputs} onShare={() => setShareOpen(true)} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <a
            href="https://www.peter-penthouse.com/?ref=calculator"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg"
          >
            ⭐ Bekijk Peter Penthouse Daktenten →
          </a>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Deze calculator geeft een indicatie op basis van jouw invoer. Werkelijke kosten kunnen afwijken afhankelijk van bestemming en seizoen.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} results={results} inputs={inputs} />
      <EmailCaptureModal isOpen={emailOpen} onClose={handleEmailClose} />
    </div>
  );
}
