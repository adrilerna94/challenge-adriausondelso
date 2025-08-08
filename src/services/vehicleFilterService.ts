import {FilterType, FilterTypeHandler, Vehicle, VehicleFilters} from "@/types";

const API_VEHICLES = process.env.NEXT_PUBLIC_API_VEHICLES as string;
const API_FILTERS = process.env.NEXT_PUBLIC_API_FILTRES as string;

export const getAllVehicles = async () => {
  const response = await fetch(API_VEHICLES);

  if (!response.ok) {
    console.log("Error al hacer fetch");

    return [];
  }
  const vehicles = (await response.json()).data;

  return vehicles as Vehicle[];
};

export const getVehiclesByBrand = async (brand: Vehicle["brand"]) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => vehicle.brand.toLowerCase().includes(brand.toLowerCase()));
};

export const getVehiclesByModel = async (model: Vehicle["model"]) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => vehicle.model.toLowerCase().includes(model.toLowerCase()));
};

export const getVehiclesByYear = async (year: string) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => vehicle.year.toString() === year);
};
export const getVehiclesByBrandAndModel = async (
  brand: Vehicle["brand"],
  model: Vehicle["model"],
) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => {
    const brandMatch = vehicle.brand.toLowerCase().includes(brand.toLowerCase());
    const modelMatch = vehicle.model.toLowerCase().includes(model.toLowerCase());

    return brandMatch && modelMatch;
  });
};
export const getVehiclesByYearAndModel = async (year: string, model: Vehicle["model"]) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => {
    const yearMatch = vehicle.year.toString() === year;
    const modelMatch = vehicle.model.toLowerCase().includes(model.toLowerCase());

    return yearMatch && modelMatch;
  });
};
export const getVehiclesByBrandAndYear = async (brand: Vehicle["brand"], year: string) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => {
    const yearMatch = vehicle.year.toString() === year;
    const brandMatch = vehicle.brand.toLowerCase().includes(brand.toLowerCase());

    return yearMatch && brandMatch;
  });
};
export const getVehiclesByBrandAndYearAndModel = async (
  brand: Vehicle["brand"],
  year: string,
  model: Vehicle["model"],
) => {
  const vehicles = await getAllVehicles();

  if (vehicles.length === 0) {
    return [];
  }

  return vehicles.filter((vehicle) => {
    const yearMatch = vehicle.year.toString() === year;
    const brandMatch = vehicle.brand.toLowerCase().includes(brand.toLowerCase());
    const modelMatch = vehicle.model.toLowerCase().includes(model.toLowerCase());

    return yearMatch && brandMatch && modelMatch;
  });
};

export const getMultipleFiltersVehicle = async (year = "", model = "", brand = "") => {
  const filterConditions = {
    all: year === "" && model === "" && brand === "",
    year: year !== "" && model === "" && brand === "",
    model: year === "" && model !== "" && brand === "",
    brand: year === "" && model === "" && brand !== "",
    yearModel: year !== "" && model !== "" && brand === "",
    brandModel: year === "" && model !== "" && brand !== "",
    yearBrand: year !== "" && model === "" && brand !== "",
    yearBrandModel: year !== "" && model !== "" && brand !== "",
  };

  const filterTypeHandler: FilterTypeHandler = {
    all: await getAllVehicles(),
    year: await getVehiclesByYear(year),
    model: await getVehiclesByModel(model),
    brand: await getVehiclesByBrand(brand),
    yearModel: await getVehiclesByYearAndModel(year, model),
    brandModel: await getVehiclesByBrandAndModel(brand, model),
    yearBrand: await getVehiclesByBrandAndYear(brand, year),
    yearBrandModel: await getVehiclesByBrandAndYearAndModel(brand, year, model),
  };

  const conditionMatch = Object.entries(filterConditions).find(([_, value]) => {
    return value === true;
  })?.[0] as FilterType;

  const vehicles = filterTypeHandler[conditionMatch];

  return vehicles as Vehicle[];
};

// retornamos objeto con categorías más array de elementos por categoría
export const getAllFiltersData = async () => {
  const response = await fetch(API_FILTERS);

  if (!response.ok) {
    console.log("Error al hacer fetch");

    return null;
  }
  const filters = await response.json();

  return filters as VehicleFilters;
};

// retornamos solo las categorías
export const getFilters = async () => {
  const filters = await getAllFiltersData();

  if (!filters) {
    console.log("Error fetching all filters data");

    return null;
  }

  return Object.keys(filters);
};
