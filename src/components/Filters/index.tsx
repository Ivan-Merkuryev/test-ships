import styles from "./Filters.module.sass";

import { INation, IShip, IType } from "../../types/ship.types";
import { Filter } from "../Filter";
import { getUniqueShipData } from "../../utils/getUniqueShipData.utils";
import { useEffect, useState } from "react";

export interface FilterValues {
  levels: (string | number) | null;
  nations: INation | null;
  types: IType | null;
  search?: string
}

export interface Filters {
  ships: IShip[];
  onFiltersChange: (filters: FilterValues) => void;
}

export function Filters({ ships, onFiltersChange }: Filters
) {
  const filtres = getUniqueShipData(ships);

  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    levels: null,
    nations: null,
    types: null,
  });

  const handleSlideChange =
    (filterTitle: keyof FilterValues) =>
    (item: string | number | INation | IType | null) => {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterTitle]: item,
      }));
    };

  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);
  return (
    <div className={styles.filters}>
      <Filter
        filtres={filtres.levels}
        filterTitle="levels"
        onSlideChange={handleSlideChange("levels")}
      />
      <Filter
        filtres={filtres.nations}
        filterTitle="nations"
        onSlideChange={handleSlideChange("nations")}
      />
      <Filter
        filtres={filtres.types}
        filterTitle="types"
        onSlideChange={handleSlideChange("types")}
      />
    </div>
  );
}
