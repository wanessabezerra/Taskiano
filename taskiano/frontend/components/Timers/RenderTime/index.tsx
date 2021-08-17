import React from "react";
import * as format from "../../../utils";

import styles from "./styles.module.scss";

function RenderTime(props: { remainingTime: number }) {
  if (props.remainingTime === 0)
    return (
      <div className={`${styles.countdownContent} ${styles.over}`}>
        Tarde D+...
      </div>
    );

  return (
    <div className={styles.countdownContent}>
      <div className={styles.RemainsFormatValue}>
        {format.RemainsFormatValue(props.remainingTime)}
      </div>

      <div className={styles.RemainsFormatText}>
        {format.RemainsFormatText(props.remainingTime)}
      </div>
    </div>
  );
}

export default RenderTime;
