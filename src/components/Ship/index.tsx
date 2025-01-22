import { useState } from "react";
import { ShipProps } from "../../types/ship.types";
import { getArabicToRoman } from "../../utils/getArabicToRoman.utils";
import styles from "./Ship.module.sass";

export function Ship({ ship }: ShipProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div key={ship.title} className={styles.ship}>
      <img
        className={styles.img}
        src={ship.icons.large}
        alt={ship.title}
        loading="lazy"
      />
      <p className={styles.title}>
        {ship.title}. {getArabicToRoman(ship.level)} уровень
      </p>
      <p className={styles.type}>
        {ship.type.title}, {ship.nation.title}
      </p>
      <img
        loading="lazy"
        className={styles.iconNation}
        src={ship.nation.icons.large}
        alt={ship.nation.title}
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.button}
      >
        {!isExpanded ? "Подробнее" : "Скрыть"}
      </button>
      {isExpanded && <p>{ship.description}</p>}
    </div>
  );
}
