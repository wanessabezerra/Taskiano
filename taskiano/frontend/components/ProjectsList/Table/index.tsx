import React from "react";

import { BiLeftArrow } from "react-icons/bi";
import { ClockTimer } from "../../ClockTimer";
import { getDescriptionTime } from "../../../utils";

import styles from "./styles.module.scss";
import Task from "../../Task";

export interface TaskProps {
  id?: number;
  title?: string;
  note?: string;
  remainingTime?: any;
  priority: number;
  created_at?: string;
  project?: string;
  projectColor?: string;
}

interface TableProps {
  tasks: Array<TaskProps>;
}

function Table(props: TableProps) {
  return (
    <table className={styles.tableContent}>
      <thead className={styles.header}>
        <tr className={styles.row}>
          <th className={styles.name}>Nome</th>
          <th className={styles.timer}>Timer</th>
          <th className={styles.priority}>Prioridade</th>
          <th className={styles.createdAt}>Data de criação</th>
          <th className={styles.project}>Projeto</th>
        </tr>
      </thead>

      <tbody className={styles.body}>
        {props.tasks.map((task, index) => (
          <tr key={index} className={styles.row}>
            <td className={styles.name}>
              <Task
                hideTimer
                key={index}
                id={task.id}
                title={task.title}
                remainingTime={task.remainingTime}
                note={task.note ?? ""}
              />
            </td>

            <td className={styles.timer}>
              <ClockTimer remainingTime={task.remainingTime} />
              {getDescriptionTime({ remainingTime: task.remainingTime })}
            </td>

            <td className={styles.priority}>{task.priority}</td>

            <td className={styles.createdAt}>{task.created_at}</td>

            <td
              className={styles.project}
              style={{ background: task.projectColor }}
            >
              <BiLeftArrow />
              {task.project}
            </td>

            <td className={styles.whiteSpace} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
