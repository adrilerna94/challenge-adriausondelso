// app/page.tsx

import React from "react";

import "./globals.css"; // Asegúrate de tener este archivo si usas CSS global
import {getAllFiltersData, getMultipleFiltersVehicle} from "@/services/vehicleFilterService";
import {VehicleList} from "@/components/VehicleList";
import {Filter} from "@/components/Filter";

type SearchParams = Promise<{[key: string]: string | string[] | undefined}>;

export default async function Home({searchParams}: {searchParams: SearchParams}) {
  const filterData = await getAllFiltersData();

  let brandsFilters: string[] = filterData ? filterData.brands : [];
  let modelsFilters: string[] = filterData ? filterData.models : [];
  let yearsFilters: number[] = filterData ? filterData.years : [];

  let {brand, model, year} = await searchParams;

  brand ??= "";
  model ??= "";
  year ??= "";

  const vehicles = await getMultipleFiltersVehicle(
    year?.toString(),
    model?.toString(),
    brand?.toString(),
  );

  return (
    <>
      <header>
        <Filter brands={brandsFilters} models={modelsFilters} years={yearsFilters} />
      </header>
      {vehicles.length > 0 ? <VehicleList vehicles={vehicles} /> : <p>Vehicles not found</p>}
    </>
  );
}
