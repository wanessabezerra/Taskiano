import React from "react";

import WeekdayBar from "./WeekdayBar";
import { MapPercentageOfMaxPerDay } from "../../utils";

import type { Weekday, WeekdayPercent } from "../../@types";

import styles from "./styles.module.scss";

interface CompassProps {
  weekdays: Weekday[];
}

function Compass(props: CompassProps) {
  const weekdaysPercents: WeekdayPercent[] = MapPercentageOfMaxPerDay(
    props.weekdays
  );

  return (
    <div className={styles.compassContainer}>
      {weekdaysPercents.map((data, index) => (
        <WeekdayBar
          day={data.day}
          height={data.percent}
          value={data.count}
          key={index}
        />
      ))}
    </div>
  );
}

export default Compass;
