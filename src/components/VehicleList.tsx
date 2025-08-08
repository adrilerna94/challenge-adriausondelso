import {Vehicle} from "@/types";

type Props = {
  vehicles: Vehicle[];
};

export function VehicleList({vehicles}: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
            <td>{vehicle.brand}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
