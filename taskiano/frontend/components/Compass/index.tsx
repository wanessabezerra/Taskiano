import React from "react";

import WeekdayBar from "./WeekdayBar";
import { useHistory } from "../../hooks/useHistory";
import { MapPercentageOfMaxPerDay } from "../../utils";

import type { Weekday } from "../../@types";
import styles from "./styles.module.scss";

function Compass() {
  const weekdays: Weekday[] = useHistory((state) => state.weekdays);
  const weekdaysPercents = MapPercentageOfMaxPerDay(weekdays);

  return (
    <div className={styles.compassContainer}>
      {weekdaysPercents.map((data) => (
        <WeekdayBar
          day={data.day}
          height={data.percent}
          value={data.count}
          key={data.day}
        />
      ))}
    </div>
  );
}

export default Compass;
