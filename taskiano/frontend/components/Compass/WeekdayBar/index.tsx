import React from "react";

import styles from "./styles.module.scss";

interface WeekdayBarProps {
  day: string;
  value: number;
  height: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function WeekdayBar(props: WeekdayBarProps) {
  return (
    <div className={styles.weekdayBarContainer}>
      <button
        className={styles.bar}
        style={{ height: `${props.height}%` }}
        onClick={props.onClick}
      />
      <div className={styles.weekday}>
        <p>{props.day}</p>
        <div className={styles.tasksDone}>
          <h1>{props.value}</h1>
          <p>{`Task's`}</p>
        </div>
      </div>
    </div>
  );
}

export default WeekdayBar;
