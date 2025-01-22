import styles from "./Filter.module.sass";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { INation, IType } from "../../types/ship.types";
import { Navigation, Scrollbar } from "swiper/modules";
import { getArabicToRoman } from "../../utils/getArabicToRoman.utils";

interface FilterSwiperProps {
  filtres: (string | number)[] | INation[] | IType[];
  filterTitle: "levels" | "nations" | "types";
  onSlideChange: (item: string | number | INation | IType | null) => void;
}
export function Filter({
  filtres,
  filterTitle,
  onSlideChange,
}: FilterSwiperProps) {
  const getContent = (item: (string | number) | IType | INation) => {
    if (filterTitle === "levels")
      return (
        <>
          {typeof item === "number" ? (
            <span className={styles.level}>
              {getArabicToRoman(item as number)}
            </span>
          ) : (
            <span className={styles.allLevel}>Все уровни</span>
          )}
        </>
      );
    if (filterTitle === "nations")
      return (
        <div className={styles.nation}>
          {(item as INation).icons.large !== "" && (
            <img
              className={styles.imgNation}
              src={(item as INation).icons.large}
              alt={(item as INation).title}
            />
          )}

          <span>{(item as INation).title}</span>
        </div>
      );

    if (filterTitle === "types")
      return (
        <div className={styles.type}>
          <span>{(item as IType).title}</span>
          <img className={styles.typeImg} src={(item as IType).icons.default} alt="" />
        </div>
      );
  };

  return (
    <div className={styles.filterCard}>
      <Swiper
        modules={[Navigation, Scrollbar]}
        slidesPerView={1}
        loop
        navigation={{
          prevEl: "#btnPrev",
          nextEl: "#btnNext",
        }}
        onActiveIndexChange={(swiper) => {
          onSlideChange(filtres[swiper.realIndex]);
        }}
      >
        {filtres.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>{getContent(item)}</div>
          </SwiperSlide>
        ))}

        <div className={styles.swiperNavCont}>
          <div className="swiper-pagination"></div>
          <button
            className={styles.btnPrev}
            id="btnPrev"
            style={{
              padding: "3px",
              cursor: "pointer",
              position: "relative"
            }}
          >
            <img src="./chevron.svg" alt="" />
          </button>
          <button
            className={styles.btnNext}
            id="btnNext"
            style={{
              padding: "3px",
              cursor: "pointer",
              position: "relative",
              transform: "rotate(180deg)",
            }}
          >
            <img src="./chevron.svg" alt="" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
