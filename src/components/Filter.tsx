"use client";
import {useRouter} from "next/navigation";
import {FormEvent} from "react";

type Props = {
  brands: string[];
  models: string[];
  years: number[];
};

export function Filter({brands, models, years}: Props) {
  const router = useRouter();

  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const brand = (form.elements.namedItem("brands") as HTMLSelectElement).value;
    const model = (form.elements.namedItem("models") as HTMLSelectElement).value;
    const year = (form.elements.namedItem("years") as HTMLSelectElement).value;

    const selectQueryValues = {brand, model, year};

    // 🕵🏻 para este bloque de código únicamente si he utilizado IA
    // ➡️ el objetivo es dejar la query string de la URL limpia de filtros no utilizados

    // Filtrar propiedades con valores no vacíos
    const filteredEntries = Object.entries(selectQueryValues).filter(([, value]) => value !== "");

    // Reconstruir objeto limpio
    const cleanedObject = Object.fromEntries(filteredEntries);

    // Construir query string solo con propiedades no vacías
    const queryString = new URLSearchParams(cleanedObject).toString();

    //

    router.push(`/?${queryString}`);
  };

  return (
    <>
      <h2>Filter Vehicles</h2>
      <form action="/" method="get" onSubmit={handleFilter}>
        <label htmlFor="brands">Brands:</label>
        <select name="brands">
          <option value="">-- Sin seleccionar</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <label htmlFor="models">Models:</label>
        <select name="models">
          <option value="">-- Sin seleccionar</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <label htmlFor="years">Years:</label>
        <select name="years">
          <option value="">-- Sin seleccionar</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input type="submit" value="Submit" />
      </form>
      <h2>See All Vehicles</h2>
      <button type="button" onClick={() => router.replace("/")}>
        See All Vehicles
      </button>
    </>
  );
}
