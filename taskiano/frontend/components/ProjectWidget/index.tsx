import React, { useState } from "react";

import Task from "../Task";

import { TaskType } from "../../@types";

import styles from "./styles.module.scss";
import ProjectStatus from "./ProjectStatus";
import CreateTask from "../CreateTask";

interface ProjectWidgetProps {
  name: string;
  tasks: TaskType[];
}

function ProjectWidget(props: ProjectWidgetProps) {
  const [addTask, setAddTask] = useState(false);

  return (
    <div className={styles.projectWidget}>
      {addTask && <CreateTask close={() => setAddTask(false)} />}
      <h1 className={styles.projectTitle}>{props.name}</h1>
      <div className={styles.projectContainer}>
        <div className={styles.projectHeader}>
          <h1 className={styles.totalTasks}>{props.tasks.length} Tarefas</h1>
          <ProjectStatus lates={2} timers={3} done={4} />
        </div>

        <button
          type="button"
          className={styles.addTask}
          onClick={() => setAddTask(true)}
        >
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
