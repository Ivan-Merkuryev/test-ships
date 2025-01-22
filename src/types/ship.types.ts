export interface INation {
  color: string;
  name: string;
  title: string;
  icons: {
    large: string;
    medium: string;
  };
}
export interface IType {
  color: string;
  name: string;
  title: string;
  icons: {
    default: string;
  };
}
export interface IShip {
  description: string;
  level: number;
  icons: {
    large: string;
    medium: string;
  };
  nation: INation;
  title: string;
  type: IType;
}

export interface ShipProps {
  ship: IShip;
}

export interface FiltersProps {
  ships: IShip[];
}
