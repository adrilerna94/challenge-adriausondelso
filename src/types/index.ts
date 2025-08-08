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

type FilterTypeHandler = Record<FilterType, Vehicle[]>;

export type {FilterType, FilterTypeHandler, Vehicle, VehicleFilters};
