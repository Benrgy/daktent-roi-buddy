import { useCallback, useRef, useState } from "react";
import { Download, Instagram, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorResults, CalculatorInputs } from "@/lib/calculator";

interface ShareImageGeneratorProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(amount);
}

function generateShareImage(results: CalculatorResults, inputs: CalculatorInputs): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const w = 1080;
    const h = 1080;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    // Background gradient (forest green to amber)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#1a5c3a");
    grad.addColorStop(0.5, "#2a7a4f");
    grad.addColorStop(1, "#c67a1a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle pattern overlay
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 80 + 20, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // White card
    const cardX = 80, cardY = 160, cardW = w - 160, cardH = h - 320;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    roundRect(ctx, cardX, cardY, cardW, cardH, 32);
    ctx.fill();

    // Card shadow
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    roundRect(ctx, cardX, cardY, cardW, cardH, 32);
    ctx.fill();
    ctx.shadowColor = "transparent";

    // Tent emoji
    ctx.font = "72px serif";
    ctx.textAlign = "center";
    ctx.fillText("🏕️", w / 2, cardY + 90);

    // Title
    ctx.font = "bold 36px 'DM Sans', sans-serif";
    ctx.fillStyle = "#1a3a25";
    ctx.fillText("Mijn Daktent Besparing", w / 2, cardY + 150);

    // Big number
    const savings = results.totalSavings;
    const isPositive = savings > 0;
    ctx.font = "900 80px 'DM Sans', sans-serif";
    ctx.fillStyle = isPositive ? "#1a5c3a" : "#b33a2a";
    ctx.fillText(
      (isPositive ? "+" : "") + formatEuro(savings),
      w / 2,
      cardY + 280
    );

    // Subtitle
    ctx.font = "500 24px 'DM Sans', sans-serif";
    ctx.fillStyle = "#666";
    ctx.fillText(
      `in ${inputs.years} jaar · ${inputs.nightsPerYear} nachten/jaar`,
      w / 2,
      cardY + 330
    );

    // Divider
    ctx.strokeStyle = "#e5e0d8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 60, cardY + 370);
    ctx.lineTo(cardX + cardW - 60, cardY + 370);
    ctx.stroke();

    // Stats row
    const stats = [
      { label: "Break-even", value: `${results.breakEvenTrips > 200 ? "200+" : results.breakEvenTrips} nachten` },
      { label: "CO₂ bespaard", value: `${results.co2Savings}kg` },
    ];
    stats.forEach((stat, i) => {
      const x = cardX + (cardW / 2) * i + cardW / 4;
      ctx.font = "bold 32px 'DM Sans', sans-serif";
      ctx.fillStyle = "#1a3a25";
      ctx.fillText(stat.value, x, cardY + 440);
      ctx.font = "400 18px 'DM Sans', sans-serif";
      ctx.fillStyle = "#888";
      ctx.fillText(stat.label, x, cardY + 470);
    });

    // CTA
    ctx.font = "600 22px 'DM Sans', sans-serif";
    ctx.fillStyle = "#c67a1a";
    ctx.fillText("Bereken jouw besparing →", w / 2, cardY + 560);

    // Bottom branding
    ctx.font = "500 18px 'DM Sans', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("Daktent ROI Calculator", w / 2, h - 60);

    // Top badge
    ctx.font = "bold 16px 'DM Sans', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("🏕️ DAKTENT ROI CALCULATOR", w / 2, 100);

    resolve(canvas.toDataURL("image/png"));
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function ShareImageButton({ results, inputs }: ShareImageGeneratorProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    const dataUrl = await generateShareImage(results, inputs);
    setPreview(dataUrl);
    setGenerating(false);
  }, [results, inputs]);

  const handleDownload = useCallback(() => {
    if (!preview) return;
    const link = document.createElement("a");
    link.download = "daktent-besparing.png";
    link.href = preview;
    link.click();
  }, [preview]);

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-md disabled:opacity-60"
      >
        <Instagram className="w-4 h-4" />
        {generating ? "Afbeelding maken..." : "📸 Maak Deelbare Afbeelding"}
      </button>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-2xl shadow-2xl max-w-lg w-full p-5 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-foreground">📸 Jouw Deelbare Afbeelding</h3>
              <img
                src={preview}
                alt="Daktent besparing deelbaar"
                className="w-full rounded-xl border border-border"
              />
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
                >
                  Sluiten
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                💡 Sla op en deel op Instagram, WhatsApp of Facebook!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
