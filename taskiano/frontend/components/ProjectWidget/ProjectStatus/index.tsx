import React from "react";
import { FaTimes } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { MdDone } from "react-icons/md";

import colors from "../../../styles/variables";
import styles from "./styles.module.scss";

interface ProjectStatusProps {
  lates: number;
  timers: number;
  done: number;
  color?: string;
}

function ProjectStatus(props: ProjectStatusProps) {
  const color = props.color || colors.highPurple;

  return (
    <div
      className={styles.projectStatusContainer}
      style={{ background: color }}
    >
      <div id="lates" className={styles.statusTasks}>
        <p>{props.lates}</p>
        <div className={styles.icon}>
          <FaTimes color={color} />
        </div>
      </div>

      <div id="timers" className={styles.statusTasks}>
        <p>{props.timers}</p>
        <div className={styles.icon}>
          <GiAlarmClock color={color} />
        </div>
      </div>

      <div id="done" className={styles.statusTasks}>
        <p>{props.done}</p>
        <div className={styles.icon}>
          <MdDone color={color} />
        </div>
      </div>
    </div>
  );
}

export default ProjectStatus;
