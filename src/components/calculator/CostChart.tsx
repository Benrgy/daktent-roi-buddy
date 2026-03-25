import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
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

  // Find break-even year
  const breakEvenIdx = yearlyBreakdown.findIndex((y) => y.savings >= 0);

  return (
    <div className="space-y-4">
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(220 9% 46%)" }} />
            <YAxis tickFormatter={formatEuro} tick={{ fontSize: 12, fill: "hsl(220 9% 46%)" }} />
            <Tooltip
              formatter={(value: number, name: string) => [`€${value.toLocaleString("nl-NL")}`, name]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(220 13% 91%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "13px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
            <Bar dataKey="Daktent" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Hotel" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
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
