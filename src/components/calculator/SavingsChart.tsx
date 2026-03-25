import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";
import { YearBreakdown } from "@/lib/calculator";

interface SavingsChartProps {
  yearlyBreakdown: YearBreakdown[];
}

function formatEuro(v: number) {
  return `€${(v / 1000).toFixed(1)}k`;
}

export function SavingsChart({ yearlyBreakdown }: SavingsChartProps) {
  const data = [
    { name: "Start", Besparing: 0 },
    ...yearlyBreakdown.map((y) => ({
      name: `Jaar ${y.year}`,
      Besparing: Math.round(y.savings),
    })),
  ];

  return (
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="savingsGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160 84% 39%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160 84% 39%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(220 9% 46%)" }} />
          <YAxis tickFormatter={formatEuro} tick={{ fontSize: 12, fill: "hsl(220 9% 46%)" }} />
          <Tooltip
            formatter={(value: number) => [`€${value.toLocaleString("nl-NL")}`, "Besparing"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(220 13% 91%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "13px",
            }}
          />
          <ReferenceLine y={0} stroke="hsl(220 9% 46%)" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="Besparing"
            stroke="hsl(160 84% 39%)"
            strokeWidth={3}
            fill="url(#savingsGreen)"
            dot={{ fill: "hsl(160 84% 39%)", strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
