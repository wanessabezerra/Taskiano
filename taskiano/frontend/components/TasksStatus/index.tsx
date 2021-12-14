import React, { useEffect } from "react";

import Task from "../Task";
import type { TaskType } from "../../@types";

import styles from "./styles.module.scss";
import Confetti from "../Confetti";

interface TasksStatusProps {
  title: string;
  tasks: TaskType[];
  onEmpty?: string;
}

function TasksStatus(props: TasksStatusProps) {
  const [syncMount, setSyncMount] = React.useState(false);

  useEffect(() => {
    const undescribe = setTimeout(() => setSyncMount(true), 500);

    return () => clearTimeout(undescribe);
  }, []);

  return (
    <div className={styles.taskStatusContainer}>
      <h1 className={styles.taskListTitle}>{props.title}</h1>

      <div className={styles.tasksList}>
        {props.tasks.length > 0
          ? props.tasks.map((task, index) => (
              <Task
                hideCheckbox
                key={task.id ?? index}
                id={task.id}
                title={task.title}
                remainingTime={task.remainingTime}
                note={task.note ?? ""}
              />
            ))
          : syncMount && (
              <>
                <Confetti className={styles.empty}>
                  <h2>{props.onEmpty}</h2>
                </Confetti>
              </>
            )}
      </div>
    </div>
  );
}

export default TasksStatus;
