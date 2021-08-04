import React from "react";

import ProjectWidget from "../../../components/ProjectWidget";
import { allTasks } from "../../../services/api";

import styles from "./styles.module.scss";

function Projects() {
    return (
        <div className={styles.container}>
            <div className={styles.projectViewOptions}>
                <h1 className={styles.title}>Projetos</h1>
                <span className={styles.separator} />
            </div>
            <div className={styles.projectsContainer}>
                <ProjectWidget tasks={allTasks} name="UFRN" />
                <ProjectWidget tasks={allTasks} name="Curso Técnico IMD" />
                <ProjectWidget tasks={allTasks} name="Lista de Compras" />
                <ProjectWidget tasks={allTasks} name="Trabalho" />
            </div>
        </div>
    );
}

export default Projects;
