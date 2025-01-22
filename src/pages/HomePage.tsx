import styles from "./HomePage.module.sass";

import { useQuery } from "@apollo/client";
import { GET_VEHICLES } from "../api";
import { IShip } from "../types/ship.types";
import { Ship } from "../components/Ship";
import { Filters, FilterValues } from "../components/Filters";
import { useState } from "react";
import { SearchShip } from "../components/SearchShip";

export function HomePage() {
  const { loading, error, data } = useQuery(GET_VEHICLES);
  const dataShips: IShip[] = data?.vehicles;

  const [filters, setFilters] = useState<FilterValues>({
    levels: null,
    nations: null,
    types: null,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const filteredShips = dataShips?.filter((ship: IShip) => {
    const matchesLevel = !filters.levels || ship.level === filters.levels;
    const matchesNation =
      !filters.nations?.name || ship.nation.name === filters.nations?.name;
    const matchesType =
      !filters.types?.name || ship.type.name === filters.types?.name;
    const matchesSearch = ship.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesLevel && matchesNation && matchesType && matchesSearch;
  });

  if (loading) return <p className="h-[100vh]">Loading...</p>;
  if (error) return <p className="h-full">Error :</p>;
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Корабли</h1>
      <div className={styles.home}>
        <div className={styles.ships}>
          {filteredShips.map((ship: IShip) => (
            <Ship ship={ship} />
          ))}
        </div>

        <div className={styles.filters}>
          <SearchShip onInputChange={handleSearchInputChange} />
          <Filters ships={dataShips} onFiltersChange={handleFiltersChange} />
          <p className={styles.counter}>Кораблей: {filteredShips.length}</p>
        </div>
      </div>
    </main>
  );
}
