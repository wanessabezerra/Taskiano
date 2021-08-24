import React, { useState } from "react";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGridFill } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";

import { useProjects } from "../../../hooks/useProjects";

import Loader from "../../../components/Loader";
import ProjectsList from "../../../components/ProjectsList";
import ProjectsWidget from "../../../components/ProjectsWidget";

import styles from "./styles.module.scss";

function Projects() {
  const [viewIn, setViewIn] = useState<"widgets" | "list">("widgets");
  const { projects } = useProjects();

  const viewHandle = {
    list: () => setViewIn("list"),
    widgets: () => setViewIn("widgets"),
    inList: () => viewIn === "list",
  };

  return (
    <div className={styles.projectsContent}>
      {!projects && <Loader />}

      <div className={styles.projectViewOptions}>
        <div className={styles.projectViewOptionsTitle}>
          <div
            className={`
              ${styles.viewOptionsIcon}
              ${!viewHandle.inList() && styles.optionSelected}
            `}
            onClick={viewHandle.widgets}
          >
            <BsGridFill />
          </div>

          <div
            className={`
              ${styles.viewOptionsIcon}
              ${viewHandle.inList() && styles.optionSelected}
            `}
            onClick={viewHandle.list}
          >
            <AiOutlineUnorderedList />
          </div>
        </div>

        <h1 className={styles.title}>Projetos</h1>

        <div className={styles.addProject}>
          <RiAddFill onClick={() => {}} />
        </div>

        <span className={styles.separator} />
      </div>

      {viewHandle.inList() ? (
        <ProjectsList projects={projects} />
      ) : (
        <ProjectsWidget projects={projects} />
      )}
    </div>
  );
}

export default Projects;
