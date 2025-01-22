import styles from './SearchShip.module.sass'

import debounce from "lodash.debounce";
import { useState, useEffect } from "react";

export function SearchShip({
  onInputChange,
}: {
  onInputChange: (value: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedOnChange = debounce((value) => {
    onInputChange(value);
  }, 400);

  useEffect(() => {
    debouncedOnChange(searchTerm)
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange, searchTerm]);

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Поиск по названию"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        debouncedOnChange(e.target.value);
      }}
    />
  );
}
