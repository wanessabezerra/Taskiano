import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { BsCalendarFill } from "react-icons/bs";

import * as utils from "../../utils";

import colors from "../../styles/variables";
import styles from "./styles.module.scss";

interface ClockTimerProps {
  remainingTime: number;
}

export function ClockTimer({ remainingTime }: ClockTimerProps) {
  if (remainingTime > 0) {
    const color = utils.selectColorByTime({ remainingTime });

    return (
      <div
        className={styles.clockTimerContainer}
        style={{ backgroundColor: color }}
      >
        <GiAlarmClock color={colors.dark} />
      </div>
    );
  } else {
    return (
      <div className={styles.calendarTimeContainer}>
        <BsCalendarFill />
      </div>
    );
  }
}
