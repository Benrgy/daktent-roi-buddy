import { presets } from "@/lib/calculator";

interface PresetButtonsProps {
  onSelect: (presetKey: string) => void;
  activePreset: string | null;
}

export function PresetButtons({ onSelect, activePreset }: PresetButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(presets).map(([key, preset]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`p-3 rounded-xl text-left transition-all duration-200 border ${
            activePreset === key
              ? "border-primary bg-primary/10 shadow-md"
              : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{preset.emoji}</span>
            <div>
              <div className="text-sm font-semibold text-foreground">{preset.label}</div>
              <div className="text-xs text-muted-foreground">{preset.desc}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
