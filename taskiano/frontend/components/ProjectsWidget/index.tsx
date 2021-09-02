import React from "react";

import type { Project } from "../../@types";
import { TaskKey } from "../../contexts/TasksContext/Provider";

import Carousel from "../Carousel";
import ProjectWidget from "./Widget";

import { getTasksOfProject } from "../../utils";

interface ProjectsWidgetsProps {
  projects: Project[];
  tasks: TaskKey[];
}

function ProjectsWidget(props: ProjectsWidgetsProps) {
  return (
    <Carousel howMany={3} infiniteScroll>
      {props.projects?.length > 0 && props.projects.map((project) => (
        <ProjectWidget
          key={project.id}
          {...project}
          tasks={getTasksOfProject(props.tasks, project.id)}
        />
      ))}
    </Carousel>
  );
}

export default ProjectsWidget;
