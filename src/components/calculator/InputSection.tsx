import { CalculatorInputs } from "@/lib/calculator";
import { Info, Calendar, Tent, Hotel, Coins, Truck, Home } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface InputSectionProps {
  inputs: CalculatorInputs;
  onChange: (updates: Partial<CalculatorInputs>) => void;
}

function SliderInput({ label, value, min, max, step = 1, unit, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit: string;
  onChange: (v: number) => void;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <motion.span
          key={value}
          initial={{ scale: 1.2, color: "hsl(155 45% 28%)" }}
          animate={{ scale: 1 }}
          className="text-sm font-bold text-primary"
        >
          {value} {unit}
        </motion.span>
      </div>
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-track w-full"
        />
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-primary/25 pointer-events-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

function EuroInput({ label, value, onChange, tooltip }: {
  label: string; value: number; onChange: (v: number) => void; tooltip?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger><Info className="w-3.5 h-3.5 text-muted-foreground" /></TooltipTrigger>
            <TooltipContent><p className="max-w-[200px] text-xs">{tooltip}</p></TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">€</span>
        <input
          type="number" value={value} min={0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>
    </div>
  );
}

function PresetRow({ presets, onSelect }: { presets: { label: string; value: number }[]; onSelect: (v: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {presets.map((p) => (
        <button key={p.label} onClick={() => onSelect(p.value)} className="preset-btn text-xs">
          {p.label}
        </button>
      ))}
    </div>
  );
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
  accentColor?: string;
}

function SectionCard({ icon, title, children, index, accentColor }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-elevated p-5 space-y-4 relative overflow-hidden"
    >
      {/* Subtle accent strip on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColor || "bg-primary/40"} rounded-r-full`} />
      <h3 className="section-header pl-2">
        <span className="p-1.5 rounded-lg bg-primary/10">{icon}</span>
        {title}
      </h3>
      <div className="space-y-4 pl-2">
        {children}
      </div>
    </motion.div>
  );
}

export function InputSection({ inputs, onChange }: InputSectionProps) {
  return (
    <div className="space-y-5">
      <SectionCard icon={<Calendar className="w-4 h-4 text-primary" />} title="Je Vakantie Gewoontes" index={0}>
        <SliderInput
          label="Hoeveel nachten per jaar ga je kamperen/reizen?"
          value={inputs.nightsPerYear} min={5} max={60} unit="nachten"
          onChange={(v) => onChange({ nightsPerYear: v })}
        />
        <SliderInput
          label="Over hoeveel jaar wil je dit berekenen?"
          value={inputs.years} min={1} max={10} unit="jaar"
          onChange={(v) => onChange({ years: v })}
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Gemiddeld aantal personen per trip?</label>
          <select
            value={inputs.persons}
            onChange={(e) => onChange({ persons: Number(e.target.value) })}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}{n === 5 ? "+" : ""} {n === 1 ? "persoon" : "personen"}</option>
            ))}
          </select>
        </div>
      </SectionCard>

      <SectionCard icon={<Tent className="w-4 h-4 text-primary" />} title="Daktent Kosten" index={1} accentColor="bg-accent/40">
        <div>
          <EuroInput label="Daktent aankoopprijs:" value={inputs.tentPrice} onChange={(v) => onChange({ tentPrice: v })} />
          <PresetRow
            presets={[
              { label: "Budget €1.200", value: 1200 },
              { label: "Mid €2.000", value: 2000 },
              { label: "Premium €3.500", value: 3500 },
            ]}
            onSelect={(v) => onChange({ tentPrice: v })}
          />
          <button
            onClick={() => onChange({ tentPrice: 1749 })}
            className="preset-btn-highlight mt-2 flex items-center gap-1.5"
          >
            ⭐ Peter Penthouse €1.749
            <span className="text-[10px] bg-primary-foreground/20 px-1.5 py-0.5 rounded-full">Aanbevolen</span>
          </button>
        </div>
        <EuroInput label="Dakdrager kosten:" value={inputs.roofRackPrice} onChange={(v) => onChange({ roofRackPrice: v })}
          tooltip="Alleen als je nog geen dakdrager hebt" />
        <EuroInput label="Jaarlijks onderhoud:" value={inputs.maintenancePerYear} onChange={(v) => onChange({ maintenancePerYear: v })}
          tooltip="Waterproofing, reparaties, etc." />
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Opslag kosten?</label>
          <select
            value={inputs.storageMonthly}
            onChange={(e) => onChange({ storageMonthly: Number(e.target.value) })}
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value={0}>Geen €0</option>
            <option value={30}>Garage huur €30/maand</option>
            <option value={50}>Opslag €50/maand</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard icon={<Hotel className="w-4 h-4 text-primary" />} title="Alternatief Kosten" index={2} accentColor="bg-warning/40">
        <div>
          <EuroInput label="Gemiddelde hotel/Airbnb prijs per nacht:" value={inputs.hotelPricePerNight} onChange={(v) => onChange({ hotelPricePerNight: v })} />
          <PresetRow
            presets={[
              { label: "Budget €60", value: 60 },
              { label: "Mid €100", value: 100 },
              { label: "Premium €150", value: 150 },
            ]}
            onSelect={(v) => onChange({ hotelPricePerNight: v })}
          />
        </div>
        <EuroInput label="Campsite prijs per nacht:" value={inputs.campsitePricePerNight} onChange={(v) => onChange({ campsitePricePerNight: v })}
          tooltip="Gemiddelde kosten per nacht op een camping met daktent" />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox" checked={inputs.useCamperRental}
              onChange={(e) => onChange({ useCamperRental: e.target.checked })}
              className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
            />
            <label className="text-sm font-medium text-foreground">Verhuur je soms campers?</label>
          </div>
          {inputs.useCamperRental && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
              <EuroInput label="Huurprijs per dag:" value={inputs.camperRentalPerDay} onChange={(v) => onChange({ camperRentalPerDay: v })} />
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <EuroInput label="Eten hotel/dag:" value={inputs.hotelFoodPerDay} onChange={(v) => onChange({ hotelFoodPerDay: v })} />
          <EuroInput label="Eten daktent/dag:" value={inputs.tentFoodPerDay} onChange={(v) => onChange({ tentFoodPerDay: v })} />
        </div>
      </SectionCard>

      <SectionCard icon={<Coins className="w-4 h-4 text-primary" />} title="Extra Kosten" index={3}>
        <EuroInput label="Extra brandstof per nacht:" value={inputs.extraFuelPerNight} onChange={(v) => onChange({ extraFuelPerNight: v })}
          tooltip="Gemiddeld 10-15% extra brandstofverbruik door daktent" />
        <EuroInput label="Parkeergeld hotels/dag:" value={inputs.hotelParkingPerDay} onChange={(v) => onChange({ hotelParkingPerDay: v })} />
        <EuroInput label="Toeristenbelasting/nacht:" value={inputs.touristTaxPerNight} onChange={(v) => onChange({ touristTaxPerNight: v })} />
      </SectionCard>

      <SectionCard icon={<Truck className="w-4 h-4 text-primary" />} title="Camper Huur Kosten" index={4} accentColor="bg-accent/40">
        <p className="text-xs text-muted-foreground -mt-2">Gebruikt in de vergelijking "Daktent vs Camper Huur"</p>
        <EuroInput label="Camper huurprijs per dag:" value={inputs.camperHuurPerDay} onChange={(v) => onChange({ camperHuurPerDay: v })} />
        <EuroInput label="Verzekering per dag:" value={inputs.camperInsurancePerDay} onChange={(v) => onChange({ camperInsurancePerDay: v })} />
        <EuroInput label="Brandstof camper per dag:" value={inputs.camperFuelPerDay} onChange={(v) => onChange({ camperFuelPerDay: v })} />
        <EuroInput label="Eten per dag (camper):" value={inputs.camperFoodPerDay} onChange={(v) => onChange({ camperFoodPerDay: v })} />
      </SectionCard>

      <SectionCard icon={<Home className="w-4 h-4 text-primary" />} title="Caravan Kosten" index={5} accentColor="bg-warning/40">
        <p className="text-xs text-muted-foreground -mt-2">Gebruikt in de vergelijking "Daktent vs Caravan Kopen"</p>
        <EuroInput label="Aanschafprijs caravan:" value={inputs.caravanPrice} onChange={(v) => onChange({ caravanPrice: v })} />
        <div className="grid grid-cols-2 gap-3">
          <EuroInput label="Onderhoud/jaar:" value={inputs.caravanMaintenancePerYear} onChange={(v) => onChange({ caravanMaintenancePerYear: v })} />
          <EuroInput label="Verzekering/jaar:" value={inputs.caravanInsurancePerYear} onChange={(v) => onChange({ caravanInsurancePerYear: v })} />
        </div>
        <EuroInput label="Stalling per maand:" value={inputs.caravanStoragePerMonth} onChange={(v) => onChange({ caravanStoragePerMonth: v })} />
        <EuroInput label="Campsite per nacht:" value={inputs.caravanCampsitePerNight} onChange={(v) => onChange({ caravanCampsitePerNight: v })} />
        <div className="grid grid-cols-2 gap-3">
          <EuroInput label="Eten/dag:" value={inputs.caravanFoodPerDay} onChange={(v) => onChange({ caravanFoodPerDay: v })} />
          <EuroInput label="Brandstof/nacht:" value={inputs.caravanFuelPerNight} onChange={(v) => onChange({ caravanFuelPerNight: v })} />
        </div>
      </SectionCard>
    </div>
  );
}
