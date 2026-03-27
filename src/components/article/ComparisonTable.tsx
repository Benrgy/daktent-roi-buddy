import { Check, X, Minus } from "lucide-react";

interface Row {
  label: string;
  daktent: "yes" | "no" | "partial" | string;
  alt: "yes" | "no" | "partial" | string;
}

interface ComparisonTableProps {
  altLabel: string;
  rows: Row[];
}

function CellIcon({ value }: { value: string }) {
  if (value === "yes") return <Check className="w-5 h-5 text-[hsl(var(--success))]" />;
  if (value === "no") return <X className="w-5 h-5 text-[hsl(var(--danger))]" />;
  if (value === "partial") return <Minus className="w-5 h-5 text-[hsl(var(--warning))]" />;
  return <span className="text-sm text-muted-foreground">{value}</span>;
}

export function ComparisonTable({ altLabel, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left px-4 py-3 font-semibold text-foreground">Eigenschap</th>
            <th className="text-center px-4 py-3 font-semibold text-primary">🏕️ Daktent</th>
            <th className="text-center px-4 py-3 font-semibold text-muted-foreground">{altLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
              <td className="px-4 py-3 text-foreground font-medium">{row.label}</td>
              <td className="px-4 py-3 text-center"><CellIcon value={row.daktent} /></td>
              <td className="px-4 py-3 text-center"><CellIcon value={row.alt} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
