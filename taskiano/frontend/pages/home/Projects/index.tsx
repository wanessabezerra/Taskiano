import React from "react";
import useSWR from "swr";

import ProjectWidget from "../../../components/ProjectWidget";
import { TaskType } from "../../../@types";
import { api } from "../../../services/api";

import styles from "./styles.module.scss";

function Projects() {
  const { data } = useSWR("task/", async (u) => {
    const res = await api.get("task/");
    let tasks: TaskType[] = res.data;

    for (var task of tasks) {
      const dateInit = new Date(task.timer);
      const dateCurr = new Date();

      const diff = Number(dateInit) - Number(dateCurr);

      task.remainingTime = Math.abs(diff / 1000);
    }

    return tasks;
  });

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.projectViewOptions}>
        <h1 className={styles.title}>Projetos</h1>
        <span className={styles.separator} />
      </div>
      <div className={styles.projectsContainer}>
        <ProjectWidget tasks={data} name="UFRN" />
        <ProjectWidget tasks={data} name="Curso Técnico IMD" />
        <ProjectWidget tasks={data} name="Lista de Compras" />
        <ProjectWidget tasks={data} name="Trabalho" />
      </div>
    </div>
  );
}

export default Projects;
