import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { BsCalendarFill } from "react-icons/bs";

import { selectColorByTime } from "../../utils";

import colors from "../../styles/variables";
import styles from "./styles.module.scss";

interface ClocktimerProps {
  remainingTime?: number;
}

export function ClockTimer({ remainingTime = 0 }: ClocktimerProps) {
  return (
    <>
      {remainingTime > 0 ? (
        <div
          className={styles.clockTimerContainer}
          style={{ backgroundColor: selectColorByTime(remainingTime) }}
        >
          <GiAlarmClock color={colors.dark} />
        </div>
      ) : (
        <div className={styles.calendarTimeContainer}>
          <BsCalendarFill />
        </div>
      )}
    </>
  );
}
