import { IShip } from "../types/ship.types";

export function getUniqueShipData(ships: IShip[]) {
  const uniqueTypes = new Set<string>();
  const uniqueNations = new Set<string>();
  const uniqueLevels = new Set<number>();

  ships.forEach((ship) => {
    uniqueTypes.add(JSON.stringify(ship.type));
    uniqueNations.add(JSON.stringify(ship.nation));
    uniqueLevels.add(ship.level);
  });

  return {
    types: [
      {
        color: "",
        name: "",
        title: "Любой тип",
        icons: {
          default: "",
        },
      },
      ...Array.from(uniqueTypes).map((type) => JSON.parse(type)),
    ],
    nations: [
      {
        color: "",
        name: "",
        title: "Любая нация",
        icons: {
          large: "",
          medium: "",
        },
      },
      ...Array.from(uniqueNations).map((nation) => JSON.parse(nation)),
    ],
    levels: [
      "",
      ...Array.from(uniqueLevels).sort((a, b) => a - b),
    ],
  };
}
