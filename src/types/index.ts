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

type FilterType =
  | "all"
  | "year"
  | "model"
  | "brand"
  | "yearModel"
  | "brandModel"
  | "yearBrand"
  | "yearBrandModel";

type FilterConditions = {
  [K in FilterType]: boolean;
};

type FilterTypeHandler = {
  [K in FilterType]: () => Promise<Vehicle[]>;
};

export type {FilterType, FilterConditions, FilterTypeHandler, Vehicle, VehicleFilters};
