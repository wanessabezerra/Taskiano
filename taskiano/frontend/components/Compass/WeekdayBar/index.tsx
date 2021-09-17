import React from "react";

import styles from "./styles.module.scss";

interface WeekdayBarProps {
  day: string;
  value: number;
  height: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const translateDays: { [key: string]: string } = {
  mon: "Seg",
  tue: "Ter",
  wed: "Qua",
  thu: "Qui",
  fri: "Sex",
  sat: "Sab",
  sun: "Dom",
};

function WeekdayBar(props: WeekdayBarProps) {
  const height = isNaN(props.height) || props.height === 0 ? 5 : props.height;

  return (
    <div className={styles.weekdayBarContainer}>
      <button
        className={styles.bar}
        style={{ height: `${height}%` }}
        onClick={props.onClick}
      />
      <div className={styles.weekday}>
        <p>{translateDays[props.day]}</p>
        <div className={styles.tasksDone}>
          <h1>{props.value}</h1>
          <p>{`Task's`}</p>
        </div>
      </div>
    </div>
  );
}

export default WeekdayBar;
