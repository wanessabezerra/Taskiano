import React, { useState } from "react";

import ProjectStatus from "./ProjectStatus";
import CreateTask from "../CreateTask";
import Task from "../Task";

import type { TaskType } from "../../@types";

import styles from "./styles.module.scss";

interface ProjectWidgetProps {
  name: string;
  tasks?: TaskType[];
}

function ProjectWidget(props: ProjectWidgetProps) {
  const [addTask, setAddTask] = useState(false);

  const handleModal = {
    openModal: () => setAddTask(true),
    closeModal: () => setAddTask(false),
  };

  return (
    <div className={styles.projectWidget}>
      {addTask && <CreateTask close={() => handleModal.closeModal()} />}

      <h1 className={styles.projectTitle}>{props.name}</h1>
      <div className={styles.projectContainer}>
        <div className={styles.projectHeader}>
          <h1 className={styles.totalTasks}>{props.tasks?.length} Tarefas</h1>
          <ProjectStatus over={2} timers={3} done={4} />
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
            <Task
              key={index}
              id={task.id}
              title={task.title}
              remainingTime={task.remainingTime}
              note={task.note ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectWidget;
