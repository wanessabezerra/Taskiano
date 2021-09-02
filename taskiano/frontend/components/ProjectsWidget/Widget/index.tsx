import React, { useState } from "react";

import ProjectStatus from "./ProjectStatus";
import CreateTask from "../../Task/Create";
import Task from "../../Task";

import type { TaskType } from "../../../@types";

import styles from "./styles.module.scss";

interface ProjectWidgetProps {
  id?: string;
  color?: number;
  name?: string;
  tasks?: TaskType[];
}

function ProjectWidget(props: ProjectWidgetProps) {
  const [addTask, setAddTask] = useState(false);

  const handleModal = {
    openModal: () => setAddTask(true),
    closeModal: () => setAddTask(false),
  };

  const getTitle = () => {
    if (props.tasks?.length) {
      return `${props.tasks.length} Tarefa${props.tasks.length > 1 ? "s" : ""}`;
    } else return "Tudo Feito";
  };

  return (
    <div className={styles.projectWidget}>
      {addTask && (
        <CreateTask
          projectId={props.id}
          projectColor={`#${props.color?.toString(16)}`}
          close={() => handleModal.closeModal()}
        />
      )}

      <h1 className={styles.projectTitle}>{props.name}</h1>
      <div className={styles.projectContainer}>
        <div className={styles.projectHeader}>
          <h1 className={styles.totalTasks}>{getTitle()}</h1>
          <ProjectStatus
            over={2}
            timers={3}
            done={4}
            color={`#${props.color?.toString(16)}`}
          />
        </div>

        <button
          type="button"
          className={styles.addTask}
          onClick={() => handleModal.openModal()}
        >
          +
        </button>

        <div className={styles.tasksContainer}>
          {props.tasks?.map((task, index) => (
            <Task {...task} key={task.id ?? index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectWidget;
