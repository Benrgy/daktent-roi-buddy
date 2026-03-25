import { presets } from "@/lib/calculator";
import { motion } from "framer-motion";
import presetWeekend from "@/assets/preset-weekend.jpg";
import presetFamily from "@/assets/preset-family.jpg";
import presetRoadtrip from "@/assets/preset-roadtrip.jpg";
import presetFirsttime from "@/assets/preset-firsttime.jpg";

const presetImages: Record<string, string> = {
  weekend: presetWeekend,
  family: presetFamily,
  roadtrip: presetRoadtrip,
  firsttime: presetFirsttime,
};

interface PresetButtonsProps {
  onSelect: (presetKey: string) => void;
  activePreset: string | null;
}

export function PresetButtons({ onSelect, activePreset }: PresetButtonsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.entries(presets).map(([key, preset], index) => {
        const isActive = activePreset === key;
        return (
          <motion.button
            key={key}
            onClick={() => onSelect(key)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className={`relative overflow-hidden rounded-2xl text-left transition-all duration-300 border group h-40 md:h-48 ${
              isActive
                ? "border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/15"
                : "border-border hover:border-primary/40 hover:shadow-lg"
            }`}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={presetImages[key]}
                alt={preset.label}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isActive ? "scale-110 brightness-75" : "scale-100 brightness-[0.55] group-hover:scale-105 group-hover:brightness-[0.65]"
                }`}
                loading="lazy"
                width={800}
                height={512}
              />
              <div className={`absolute inset-0 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"
                  : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              }`} />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4">
              <motion.span
                className="text-3xl block mb-1"
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {preset.emoji}
              </motion.span>
              <div className="text-sm font-bold text-white drop-shadow-md">{preset.label}</div>
              <div className="text-xs text-white/80 mt-0.5 drop-shadow-sm">{preset.desc}</div>

              {isActive && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className="h-0.5 bg-primary-foreground rounded-full mt-2"
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
