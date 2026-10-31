import { describe, expect, it } from "vitest";
import { hurenOfKopen, type HurenOfKopenInputs } from "./hurenOfKopen";

const example: HurenOfKopenInputs = { tripsPerYear: 2, rentPerTrip: 250, years: 5, purchasePrice: 1950, roofRacks: 0, storagePerMonth: 0, resaleValue: 0 };

describe("huren of kopen", () => {
  it("rekent huren totaal als reizen × huur × jaren", () => {
    expect(hurenOfKopen(example)?.rentTotal).toBe(2500);
  });
  it("rekent kopen totaal met aanschaf, dakdragers, stalling en verkoopwaarde", () => {
    expect(hurenOfKopen(example)?.buyTotal).toBe(1950);
    expect(hurenOfKopen({ ...example, roofRacks: 100, storagePerMonth: 10, resaleValue: 400 })?.buyTotal).toBe(2250);
  });
  it("berekent het omslagpunt in reizen totaal", () => {
    expect(hurenOfKopen(example)?.breakEvenTrips).toBe(7.8);
  });
  it("berekent het omslagpunt per jaar", () => {
    expect(hurenOfKopen(example)?.breakEvenPerYear).toBe(1.56);
  });
  it("toont 550 in het voordeel van kopen", () => {
    expect(hurenOfKopen(example)?.difference).toBe(550);
  });
  it("berekent kosten per reis bij kopen", () => {
    expect(hurenOfKopen(example)?.buyPerTrip).toBe(195);
  });
  it("verrekent verkoopwaarde alleen aan het eind in de grafiek", () => {
    const result = hurenOfKopen({ ...example, resaleValue: 400 });
    expect(result?.yearlyCosts[1].buy).toBe(1950);
    expect(result?.yearlyCosts.at(-1)?.buy).toBe(1550);
  });
  it("voorkomt deling door nul", () => {
    expect(hurenOfKopen({ ...example, rentPerTrip: 0 })?.breakEvenTrips).toBeNull();
    expect(hurenOfKopen({ ...example, tripsPerYear: 0 })?.buyPerTrip).toBeNull();
    expect(hurenOfKopen({ ...example, years: 0 })).toBeNull();
  });
  it("onderscheidt gelijkspel van strikt goedkoper bij hele reizen", () => {
    expect(hurenOfKopen({ ...example, purchasePrice: 2000 })?.firstCheaperTrip).toBe(9);
  });
});