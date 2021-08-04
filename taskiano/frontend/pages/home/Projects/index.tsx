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
                <ProjectWidget name="UFRN" />
                <ProjectWidget name="Curso Técnico IMD" />
                <ProjectWidget name="Lista de Compras" />
            </div>
        </div>
    );
}

export default Projects;
