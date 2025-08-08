type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
};

type VehicleFilters = {
  brands: string[];
  models: string[];
  years: number[];
};

export type {Vehicle, VehicleFilters};
