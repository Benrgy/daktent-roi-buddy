export interface HurenOfKopenInputs {
  tripsPerYear: number;
  rentPerTrip: number;
  years: number;
  purchasePrice: number;
  roofRacks: number;
  storagePerMonth: number;
  resaleValue: number;
}

export function hurenOfKopen(inputs: HurenOfKopenInputs) {
  const { tripsPerYear, rentPerTrip, years, purchasePrice, roofRacks, storagePerMonth, resaleValue } = inputs;
  if (Object.values(inputs).some(value => !Number.isFinite(value) || value < 0) || years <= 0) {
    return null;
  }
  const totalTrips = tripsPerYear * years;
  const rentTotal = totalTrips * rentPerTrip;
  const buyTotal = purchasePrice + roofRacks + storagePerMonth * 12 * years - resaleValue;
  const breakEvenTrips = rentPerTrip > 0 ? buyTotal / rentPerTrip : null;
  const breakEvenPerYear = breakEvenTrips === null ? null : breakEvenTrips / years;
  const yearlyCosts = [{ year: 0, rent: 0, buy: purchasePrice + roofRacks }];
  for (let year = 1; year < years; year++) {
    yearlyCosts.push({ year, rent: tripsPerYear * rentPerTrip * year, buy: purchasePrice + roofRacks + storagePerMonth * 12 * year });
  }
  yearlyCosts.push({ year: years, rent: rentTotal, buy: buyTotal });
  return {
    rentTotal,
    buyTotal,
    difference: rentTotal - buyTotal,
    breakEvenTrips,
    breakEvenPerYear,
    firstCheaperTrip: breakEvenTrips === null ? null : Math.max(0, Math.floor(breakEvenTrips) + 1),
    buyPerTrip: totalTrips > 0 ? buyTotal / totalTrips : null,
    yearlyCosts,
  };
}