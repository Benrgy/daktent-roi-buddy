import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      <div className="rounded-xl border border-[hsl(var(--success))]/20 bg-[hsl(var(--success-light))] p-5">
        <div className="flex items-center gap-2 mb-3">
          <ThumbsUp className="w-5 h-5 text-[hsl(var(--success))]" />
          <h4 className="font-bold text-foreground">Voordelen</h4>
        </div>
        <ul className="space-y-2">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-[hsl(var(--success))] mt-0.5">✓</span> {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-[hsl(var(--danger))]/20 bg-[hsl(var(--danger-light))] p-5">
        <div className="flex items-center gap-2 mb-3">
          <ThumbsDown className="w-5 h-5 text-[hsl(var(--danger))]" />
          <h4 className="font-bold text-foreground">Nadelen</h4>
        </div>
        <ul className="space-y-2">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-[hsl(var(--danger))] mt-0.5">✗</span> {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
