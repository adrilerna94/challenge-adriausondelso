import {Vehicle, VehicleFilters} from "@/types";

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
  let vehicles: Vehicle[] = [];

  // probamos todas las combinatorias posibles de filtro (en total 8)
  if (year === "" && model === "" && brand === "") {
    vehicles = await getAllVehicles();
  } else if (year !== "" && model === "" && brand === "") {
    vehicles = await getVehiclesByYear(year);
  } else if (year === "" && model !== "" && brand === "") {
    vehicles = await getVehiclesByModel(model);
  } else if (year === "" && model === "" && brand !== "") {
    vehicles = await getVehiclesByBrand(brand);
  } else if (year !== "" && model !== "" && brand === "") {
    vehicles = await getVehiclesByYearAndModel(year, model);
  } else if (year === "" && model !== "" && brand !== "") {
    vehicles = await getVehiclesByBrandAndModel(brand, model);
  } else if (year !== "" && model === "" && brand !== "") {
    vehicles = await getVehiclesByBrandAndYear(brand, year);
  } else if (year !== "" && model !== "" && brand !== "") {
    vehicles = await getVehiclesByBrandAndYearAndModel(brand, year, model);
  }

  return vehicles;
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
