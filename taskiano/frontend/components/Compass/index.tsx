import React from "react";

import { MapPercentageOfMaxPerDay } from "./utils";
import WeekdayBar from "./WeekdayBar";
import { Weekday, WeekdaysPercent } from "./types";

import styles from "./styles.module.scss";

interface CompassProps {
    weekdays: Weekday[];
}

function Compass(props: CompassProps) {
    const weekdaysPercents: WeekdaysPercent[] = MapPercentageOfMaxPerDay(
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
