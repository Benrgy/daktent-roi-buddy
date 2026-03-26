import { useCallback, useState } from "react";
import { FileDown } from "lucide-react";
import { CalculatorResults, CalculatorInputs } from "@/lib/calculator";

interface PdfExportProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(amount);
}

function generatePdfHtml(results: CalculatorResults, inputs: CalculatorInputs): string {
  const isPositive = results.totalSavings > 0;
  const breakEvenYears = (results.breakEvenMonths / 12).toFixed(1);

  const breakdownRows = (items: { label: string; amount: number }[]) =>
    items.filter(i => i.amount > 0).map(i =>
      `<tr><td style="padding:6px 12px;border-bottom:1px solid #e8e3dc;color:#5a5048;">${i.label}</td>
       <td style="padding:6px 12px;border-bottom:1px solid #e8e3dc;text-align:right;font-weight:600;">${formatEuro(i.amount)}</td></tr>`
    ).join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Daktent ROI Rapport</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'DM Sans',sans-serif; color:#2a2018; background:#fff; }
  @page { size:A4; margin:0; }
  .page { width:210mm; min-height:297mm; padding:20mm 25mm; }
  .header { text-align:center; margin-bottom:30px; padding-bottom:20px; border-bottom:3px solid #1a5c3a; }
  .header h1 { font-size:28px; color:#1a5c3a; margin-bottom:8px; }
  .header p { color:#8a7e72; font-size:14px; }
  .hero { text-align:center; padding:30px 20px; margin:20px 0; border-radius:16px; 
    background:linear-gradient(135deg,#eaf5ef,#faf5ee); border:2px solid ${isPositive ? "#1a5c3a30" : "#b33a2a30"}; }
  .hero .big { font-size:48px; font-weight:800; color:${isPositive ? "#1a5c3a" : "#b33a2a"}; }
  .hero .label { font-size:14px; color:#8a7e72; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px; }
  .hero .sub { font-size:16px; color:#5a5048; margin-top:10px; }
  .stats { display:flex; gap:16px; margin:20px 0; }
  .stat { flex:1; text-align:center; padding:16px; background:#faf8f5; border-radius:12px; border:1px solid #e8e3dc; }
  .stat .value { font-size:24px; font-weight:700; color:#1a5c3a; }
  .stat .label { font-size:12px; color:#8a7e72; margin-top:4px; }
  .section { margin:24px 0; }
  .section h2 { font-size:18px; color:#1a5c3a; margin-bottom:12px; padding-bottom:8px; border-bottom:2px solid #e8e3dc; }
  table { width:100%; border-collapse:collapse; }
  table th { text-align:left; padding:8px 12px; background:#1a5c3a; color:white; font-size:13px; }
  table th:last-child { text-align:right; }
  .total td { font-weight:700; font-size:15px; border-top:2px solid #1a5c3a; padding-top:10px; }
  .footer { margin-top:40px; text-align:center; padding-top:20px; border-top:2px solid #e8e3dc; }
  .footer p { font-size:12px; color:#8a7e72; }
  .footer a { color:#1a5c3a; font-weight:600; }
  .cta { display:inline-block; margin-top:16px; padding:12px 24px; background:#1a5c3a; color:white; border-radius:10px; 
    text-decoration:none; font-weight:700; font-size:14px; }
  .env { display:flex; gap:16px; margin:16px 0; }
  .env-card { flex:1; text-align:center; padding:14px; background:#eaf5ef; border-radius:12px; }
  .env-card .val { font-size:22px; font-weight:700; color:#1a5c3a; }
  .env-card .lbl { font-size:11px; color:#5a5048; margin-top:4px; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <h1>🏕️ Daktent ROI Rapport</h1>
    <p>Gepersonaliseerde berekening · ${new Date().toLocaleDateString("nl-NL", { day:"numeric", month:"long", year:"numeric" })}</p>
  </div>

  <div class="hero">
    <p class="label">Totale ${isPositive ? "besparing" : "meerkosten"} in ${inputs.years} jaar</p>
    <p class="big">${isPositive ? "+" : ""}${formatEuro(results.totalSavings)}</p>
    <p class="sub">Break-even na ${results.breakEvenTrips > 200 ? "200+" : results.breakEvenTrips} nachten (≈ ${breakEvenYears} jaar)</p>
  </div>

  <div class="stats">
    <div class="stat"><div class="value">${inputs.nightsPerYear}</div><div class="label">Nachten/jaar</div></div>
    <div class="stat"><div class="value">${inputs.years}</div><div class="label">Jaar</div></div>
    <div class="stat"><div class="value">${inputs.persons}</div><div class="label">Personen</div></div>
    <div class="stat"><div class="value">${formatEuro(inputs.tentPrice)}</div><div class="label">Daktent prijs</div></div>
  </div>

  <div class="section">
    <h2>🏕️ Daktent Route</h2>
    <table>
      <tr><th>Kostenpost</th><th>Bedrag</th></tr>
      ${breakdownRows(results.daktentBreakdown.items)}
      <tr class="total"><td style="padding:10px 12px;">TOTAAL</td><td style="padding:10px 12px;text-align:right;color:#1a5c3a;">${formatEuro(results.daktentBreakdown.total)}</td></tr>
    </table>
  </div>

  <div class="section">
    <h2>🏨 Hotel/Airbnb Route</h2>
    <table>
      <tr><th>Kostenpost</th><th>Bedrag</th></tr>
      ${breakdownRows(results.hotelBreakdown.items)}
      <tr class="total"><td style="padding:10px 12px;">TOTAAL</td><td style="padding:10px 12px;text-align:right;color:#b33a2a;">${formatEuro(results.hotelBreakdown.total)}</td></tr>
    </table>
  </div>

  <div class="section">
    <h2>📊 Jaarlijks Overzicht</h2>
    <table>
      <tr><th>Jaar</th><th>Daktent (cum.)</th><th>Hotel (cum.)</th><th>Besparing</th></tr>
      ${results.yearlyBreakdown.map(y =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #e8e3dc;">Jaar ${y.year}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e8e3dc;">${formatEuro(y.daktentCumulative)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e8e3dc;">${formatEuro(y.hotelCumulative)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e8e3dc;font-weight:600;color:${y.savings > 0 ? "#1a5c3a" : "#b33a2a"};">${y.savings > 0 ? "+" : ""}${formatEuro(y.savings)}</td>
        </tr>`
      ).join("")}
    </table>
  </div>

  <div class="section">
    <h2>🌍 Milieu Impact</h2>
    <div class="env">
      <div class="env-card"><div class="val">${results.co2Savings}kg</div><div class="lbl">CO₂ bespaard</div></div>
      <div class="env-card"><div class="val">${results.plasticSavings}</div><div class="lbl">Plastic flesjes vermeden</div></div>
    </div>
  </div>

  <div class="footer">
    <p>Berekend met de Daktent ROI Calculator</p>
    <p style="margin-top:4px;">Deze berekening is indicatief. Werkelijke kosten kunnen afwijken.</p>
    <a class="cta" href="https://www.peter-penthouse.com/?ref=calculator-pdf">⭐ Bekijk Peter Penthouse Daktenten →</a>
  </div>
</div>
</body>
</html>`;
}

export function PdfExportButton({ results, inputs }: PdfExportProps) {
  const [generating, setGenerating] = useState(false);

  const handleExport = useCallback(() => {
    setGenerating(true);
    const html = generatePdfHtml(results, inputs);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        setGenerating(false);
      }, 500);
    } else {
      // Fallback: download HTML
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "daktent-roi-rapport.html";
      a.click();
      URL.revokeObjectURL(url);
      setGenerating(false);
    }
  }, [results, inputs]);

  return (
    <button
      onClick={handleExport}
      disabled={generating}
      className="w-full py-3 rounded-xl border-2 border-primary/20 text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all disabled:opacity-60"
    >
      <FileDown className="w-4 h-4 text-primary" />
      {generating ? "Rapport genereren..." : "📄 Download PDF Rapport"}
    </button>
  );
}
