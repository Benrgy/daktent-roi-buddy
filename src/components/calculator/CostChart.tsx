import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { YearBreakdown } from "@/lib/calculator";

interface CostChartProps {
  yearlyBreakdown: YearBreakdown[];
  altLabel?: string;
}

function formatEuro(v: number) {
  return `€${(v / 1000).toFixed(1)}k`;
}

export function CostChart({ yearlyBreakdown, altLabel = "Hotel" }: CostChartProps) {
  const data = yearlyBreakdown.map((y) => ({
    name: `Jaar ${y.year}`,
    Daktent: Math.round(y.daktentCumulative),
    [altLabel]: Math.round(y.hotelCumulative),
    Besparing: Math.round(y.savings),
  }));

  const breakEvenIdx = yearlyBreakdown.findIndex((y) => y.savings >= 0);

  return (
    <div className="space-y-4">
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 15% 89%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(30 8% 46%)" }} />
            <YAxis tickFormatter={formatEuro} tick={{ fontSize: 12, fill: "hsl(30 8% 46%)" }} />
            <Tooltip
              formatter={(value: number, name: string) => [`€${value.toLocaleString("nl-NL")}`, name]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(30 15% 89%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                fontSize: "13px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
            <Bar dataKey="Daktent" fill="hsl(152 55% 38%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey={altLabel} fill="hsl(28 85% 52%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {breakEvenIdx >= 0 && (
        <p className="text-center text-sm text-muted-foreground">
          🎯 Break-even bereikt in <span className="font-semibold text-accent">Jaar {breakEvenIdx + 1}</span>
        </p>
      )}
    </div>
  );
}
