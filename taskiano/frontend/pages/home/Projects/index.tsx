import React from "react";

import ProjectWidget from "../../../components/ProjectWidget";

import styles from "./styles.module.scss";

function Projects() {
    return (
        <div className={styles.projectsContainer}>
            <h1 className={styles.title}>Projetos</h1>
            <span className={styles.separator} />
            <ProjectWidget name="UFRN" />
            <ProjectWidget name="Curso Técnico IMD" />
            <ProjectWidget name="Lista de Compras" />
        </div>
    );
}

export default Projects;
