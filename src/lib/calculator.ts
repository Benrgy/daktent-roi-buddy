export interface CalculatorInputs {
  nightsPerYear: number;
  years: number;
  persons: number;
  tentPrice: number;
  roofRackPrice: number;
  maintenancePerYear: number;
  storageMonthly: number;
  hotelPricePerNight: number;
  campsitePricePerNight: number;
  useCamperRental: boolean;
  camperRentalPerDay: number;
  hotelFoodPerDay: number;
  tentFoodPerDay: number;
  extraFuelPerNight: number;
  hotelParkingPerDay: number;
  touristTaxPerNight: number;
}

export interface ScenarioResult {
  label: string;
  emoji: string;
  altLabel: string;
  altEmoji: string;
  totalDaktentCost: number;
  totalAltCost: number;
  totalSavings: number;
  breakEvenTrips: number;
  breakEvenMonths: number;
  savingsMultiplier: number;
  yearlyBreakdown: YearBreakdown[];
  daktentBreakdown: CostBreakdown;
  altBreakdown: CostBreakdown;
}

export interface CalculatorResults {
  totalDaktentCost: number;
  totalHotelCost: number;
  totalSavings: number;
  breakEvenTrips: number;
  breakEvenMonths: number;
  savingsMultiplier: number;
  yearlyBreakdown: YearBreakdown[];
  daktentBreakdown: CostBreakdown;
  hotelBreakdown: CostBreakdown;
  co2Savings: number;
  plasticSavings: number;
  scenarios: ScenarioResult[];
}

export interface YearBreakdown {
  year: number;
  daktentCumulative: number;
  hotelCumulative: number;
  savings: number;
}

export interface CostBreakdown {
  items: { label: string; amount: number }[];
  total: number;
}

export const defaultInputs: CalculatorInputs = {
  nightsPerYear: 20,
  years: 5,
  persons: 2,
  tentPrice: 2000,
  roofRackPrice: 350,
  maintenancePerYear: 50,
  storageMonthly: 0,
  hotelPricePerNight: 90,
  campsitePricePerNight: 25,
  useCamperRental: false,
  camperRentalPerDay: 85,
  hotelFoodPerDay: 50,
  tentFoodPerDay: 25,
  extraFuelPerNight: 5,
  hotelParkingPerDay: 15,
  touristTaxPerNight: 3,
};

export const presets: Record<string, { label: string; emoji: string; desc: string; values: Partial<CalculatorInputs> }> = {
  weekend: {
    label: "Weekend Warrior",
    emoji: "🏔️",
    desc: "15 nachten/jaar, budget hotels",
    values: { nightsPerYear: 15, years: 5, persons: 2, tentPrice: 2000, hotelPricePerNight: 90 },
  },
  family: {
    label: "Familie Vakantie",
    emoji: "👨‍👩‍👧‍👦",
    desc: "30 nachten/jaar, 4 personen, Airbnb's",
    values: { nightsPerYear: 30, years: 5, persons: 4, tentPrice: 2500, hotelPricePerNight: 120, hotelFoodPerDay: 70, tentFoodPerDay: 35 },
  },
  roadtrip: {
    label: "Roadtrip Addict",
    emoji: "🚗",
    desc: "50+ nachten/jaar, mix camping/hotels",
    values: { nightsPerYear: 50, years: 5, persons: 2, tentPrice: 2500, hotelPricePerNight: 60, campsitePricePerNight: 20 },
  },
  firsttime: {
    label: "Eerste Keer Koper",
    emoji: "🌱",
    desc: "Onzeker, gemiddelde waarden",
    values: { ...defaultInputs },
  },
};

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const totalNights = inputs.nightsPerYear * inputs.years;

  // Daktent costs
  const tentPurchase = inputs.tentPrice;
  const roofRack = inputs.roofRackPrice;
  const maintenance = inputs.maintenancePerYear * inputs.years;
  const storage = inputs.storageMonthly * 12 * inputs.years;
  const extraFuel = inputs.extraFuelPerNight * totalNights;
  const campsiteCost = inputs.campsitePricePerNight * totalNights;
  const tentFood = inputs.tentFoodPerDay * totalNights;

  const totalDaktentCost = tentPurchase + roofRack + maintenance + storage + extraFuel + campsiteCost + tentFood;

  // Hotel costs
  const hotelNights = inputs.hotelPricePerNight * totalNights;
  const hotelFood = inputs.hotelFoodPerDay * totalNights;
  const parking = inputs.hotelParkingPerDay * totalNights;
  const touristTax = inputs.touristTaxPerNight * totalNights;

  const totalHotelCost = hotelNights + hotelFood + parking + touristTax;

  const totalSavings = totalHotelCost - totalDaktentCost;

  // Break-even calculation
  const costPerNightDaktent = (inputs.campsitePricePerNight + inputs.tentFoodPerDay + inputs.extraFuelPerNight);
  const costPerNightHotel = (inputs.hotelPricePerNight + inputs.hotelFoodPerDay + inputs.hotelParkingPerDay + inputs.touristTaxPerNight);
  const savingsPerNight = costPerNightHotel - costPerNightDaktent;
  const initialInvestment = inputs.tentPrice + inputs.roofRackPrice;
  
  const breakEvenNights = savingsPerNight > 0 ? Math.ceil(initialInvestment / savingsPerNight) : 999;
  const breakEvenTrips = breakEvenNights; // 1 trip = 1 night for simplicity
  const breakEvenMonths = savingsPerNight > 0 && inputs.nightsPerYear > 0 
    ? Math.ceil((breakEvenNights / inputs.nightsPerYear) * 12) 
    : 999;

  const savingsMultiplier = totalDaktentCost > 0 ? totalHotelCost / totalDaktentCost : 1;

  // Yearly breakdown
  const yearlyBreakdown: YearBreakdown[] = [];
  for (let y = 1; y <= inputs.years; y++) {
    const nightsSoFar = inputs.nightsPerYear * y;
    const dCum = tentPurchase + roofRack + (inputs.maintenancePerYear * y) + (inputs.storageMonthly * 12 * y) +
      (inputs.extraFuelPerNight * nightsSoFar) + (inputs.campsitePricePerNight * nightsSoFar) + (inputs.tentFoodPerDay * nightsSoFar);
    const hCum = (inputs.hotelPricePerNight * nightsSoFar) + (inputs.hotelFoodPerDay * nightsSoFar) +
      (inputs.hotelParkingPerDay * nightsSoFar) + (inputs.touristTaxPerNight * nightsSoFar);
    yearlyBreakdown.push({ year: y, daktentCumulative: dCum, hotelCumulative: hCum, savings: hCum - dCum });
  }

  // Environmental
  const co2Savings = Math.round(totalNights * 4.5); // ~4.5kg CO2 per hotel night
  const plasticSavings = Math.round(totalNights * 2.4); // ~2.4 plastic items per hotel night

  return {
    totalDaktentCost,
    totalHotelCost,
    totalSavings,
    breakEvenTrips,
    breakEvenMonths,
    savingsMultiplier,
    yearlyBreakdown,
    daktentBreakdown: {
      items: [
        { label: "Aanschaf daktent", amount: tentPurchase },
        { label: "Dakdrager", amount: roofRack },
        { label: `Onderhoud (${inputs.years}j)`, amount: maintenance },
        { label: "Opslag", amount: storage },
        { label: "Extra brandstof", amount: extraFuel },
        { label: `Campsites (${totalNights} nachten)`, amount: campsiteCost },
        { label: "Eten (zelfkoken)", amount: tentFood },
      ],
      total: totalDaktentCost,
    },
    hotelBreakdown: {
      items: [
        { label: `Overnachtingen (${totalNights} nachten)`, amount: hotelNights },
        { label: "Eten (uit/hotel)", amount: hotelFood },
        { label: "Parkeren", amount: parking },
        { label: "Toeristenbelasting", amount: touristTax },
      ],
      total: totalHotelCost,
    },
    co2Savings,
    plasticSavings,
  };
}
