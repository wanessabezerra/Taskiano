import React from "react";
import useSWR from "swr";

import { useAuth } from "../../../hooks/useAuth";
import { TaskRest } from "../../../services/api";

import Carousel from "../../../components/Carousel";
import ProjectWidget from "../../../components/ProjectWidget";

import styles from "./styles.module.scss";

function Projects() {
  const { getToken } = useAuth();

  const { data } = useSWR("task/", async () => {
    let tasks: any = await TaskRest.get(await getToken());

    for (var task of tasks) {
      const dateInit = new Date(task.timer);
      const dateCurr = new Date();

      const diff = Number(dateInit) - Number(dateCurr);

      task.remainingTime = Math.abs(diff / 1000);
    }

    return tasks;
  });

  return (
    <div className={styles.projectsContent}>
      <div className={styles.projectViewOptions}>
        <h1 className={styles.title}>Projetos</h1>
        <span className={styles.separator} />
      </div>
      <Carousel gap={2} howMany={3}>
        <ProjectWidget tasks={data} name="UFRN" />
        <ProjectWidget tasks={data} name="Curso Técnico IMD" />
        <ProjectWidget tasks={data} name="Lista de Compras" />
        <ProjectWidget tasks={data} name="Trabalho" />
        <ProjectWidget tasks={data} name="Curso Online" />
      </Carousel>
    </div>
  );
}

export default Projects;
