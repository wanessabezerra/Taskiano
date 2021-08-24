import React from "react";

import Task from "../Task";
import type { TaskType } from "../../@types";

import styles from "./styles.module.scss";

interface TasksStatusProps {
  title: string;
  tasks: Array<TaskType>;
}

function TasksStatus(props: TasksStatusProps) {
  return (
    <div className={styles.taskStatusContainer}>
      <h1 className={styles.taskListTitle}>{props.title}</h1>

      <div className={styles.tasksList}>
        {props.tasks.map((task, index) => (
          <Task
            hideCheckbox
            key={index}
            id={task.id}
            title={task.title}
            remainingTime={task.remainingTime}
            note={task.note ?? ""}
          />
        ))}
      </div>
    </div>
  );
}

export default TasksStatus;
