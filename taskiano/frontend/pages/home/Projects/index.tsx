import React, { useState } from "react";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGridFill } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";

import { useTasks } from "../../../hooks/useTasks";
import { useProjects } from "../../../hooks/useProjects";

import ProjectsList from "../../../components/ProjectsList";
import ProjectsWidget from "../../../components/ProjectsWidget";
import Loader from "../../../components/Loader";

import styles from "./styles.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import CreateProject from "../../../components/Project/Create";

function Projects() {
  const [viewIn, setViewIn] = useState<"widgets" | "list">("widgets");
  const [addProject, setAddProject] = useState(false);

  const projects = useProjects((ctx) => ctx.projects);
  const tasks = useTasks((value) => value.tasks);
  const token = useAuth((ctx) => ctx.token);

  const viewHandle = {
    list: () => setViewIn("list"),
    widgets: () => setViewIn("widgets"),
    inList: () => viewIn === "list",
    inWidget: () => viewIn === "widgets",
  };

  return (
    <div className={styles.projectsContent}>
      <Loader isLoading={!token} />
      {addProject && <CreateProject close={() => setAddProject(false)} />}

      <div className={styles.projectViewOptions}>
        <div className={styles.projectViewOptionsTitle}>
          <div
            className={`
              ${styles.viewOptionsIcon}
              ${viewHandle.inWidget() && styles.optionSelected}
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
          <RiAddFill onClick={() => setAddProject(true)} />
        </div>

        <span className={styles.separator} />
      </div>

      {viewHandle.inList() && projects.length > 0 ? (
        <ProjectsList projects={projects} tasks={tasks} />
      ) : (
        <ProjectsWidget projects={projects} tasks={tasks} />
      )}
    </div>
  );
}

export default Projects;
