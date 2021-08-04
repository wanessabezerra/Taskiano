import React from "react";

import Task from "../Task";

import { TaskType } from "../../@types";

import styles from "./styles.module.scss";

interface ProjectWidgetProps {
  name: string;
  tasks: TaskType[];
}

function ProjectWidget(props: ProjectWidgetProps) {
  return (
    <div className={styles.projectWidget}>
      <h1 className={styles.projectTitle}>{props.name}</h1>
      <div className={styles.projectContainer}>
        <div className={styles.projectHeader}>
          <h1 className={styles.totalTasks}>{props.tasks.length} Tarefas</h1>
          <div className={styles.progressProject}>
            <div className={styles.statusTasks}>
              <p>{2}</p>
            </div>
            <div className={styles.statusTasks}>
              <p>{2}</p>
            </div>
            <div className={styles.statusTasks}>
              <p>{2}</p>
            </div>
          </div>
        </div>
        <button type="button" className={styles.addTask}>
          +
        </button>
        <div className={styles.tasksContainer}>
          {props.tasks.map((task, index) => {
            return <Task key={index} {...task} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectWidget;
