import { presets } from "@/lib/calculator";

interface PresetButtonsProps {
  onSelect: (presetKey: string) => void;
  activePreset: string | null;
}

export function PresetButtons({ onSelect, activePreset }: PresetButtonsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.entries(presets).map(([key, preset]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`p-4 rounded-2xl text-left transition-all duration-200 border group ${
            activePreset === key
              ? "border-primary bg-primary/8 shadow-lg shadow-primary/10"
              : "border-border bg-card hover:border-primary/30 hover:shadow-md"
          }`}
        >
          <span className="text-2xl block mb-2">{preset.emoji}</span>
          <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{preset.label}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{preset.desc}</div>
        </button>
      ))}
    </div>
  );
}
