import { describe, expect, it } from "vitest";
import { calculate, defaultInputs } from "./calculator";

describe("hoofdcalculator zonder productkortingen", () => {
  it("berekent geen bronloze CO2-besparing", () => {
    expect(calculate(defaultInputs)).not.toHaveProperty("co2Savings");
  });
  it("berekent geen vermeden hotelflesjes", () => {
    expect(calculate(defaultInputs)).not.toHaveProperty("plasticSavings");
  });
  it.each([
    { tentPrice: 2000, totalDaktentCost: 8100, totalSavings: 7700, nights: 23, months: 14 },
    { tentPrice: 1800, totalDaktentCost: 7900, totalSavings: 7900, nights: 21, months: 13 },
    { tentPrice: 1950, totalDaktentCost: 8050, totalSavings: 7750, nights: 23, months: 14 },
  ])("behoudt gewone kosten bij aanschaf $tentPrice zonder brandstof- of solarbonus", example => {
    const result = calculate({ ...defaultInputs, tentPrice: example.tentPrice });
    expect(result.totalDaktentCost).toBe(example.totalDaktentCost);
    expect(result.totalHotelCost).toBe(15800);
    expect(result.totalSavings).toBe(example.totalSavings);
    expect(result.breakEvenTrips).toBe(example.nights);
    expect(result.breakEvenMonths).toBe(example.months);
    expect(result.daktentBreakdown.items.find(item => item.label === "Extra brandstof")?.amount).toBe(500);
    expect(result.scenarios.map(scenario => scenario.totalDaktentCost)).toEqual([example.totalDaktentCost, example.totalDaktentCost]);
  });
});