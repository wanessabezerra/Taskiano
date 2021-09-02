import React from "react";

import { Project } from "../../@types";
import { TaskKey } from "../../contexts/TasksContext/Provider";
import { getTasksOfProject } from "../../utils";

import Table, { TaskProps } from "./Table";

interface ProjectsListProps {
  tasks: TaskKey[];
  projects: Project[];
}

function ProjectsList(props: ProjectsListProps) {
  var data: TaskProps[] = [];

  props.projects.forEach((project) => {
    const tasksOfProjects = getTasksOfProject(props.tasks, project.id);

    tasksOfProjects?.forEach((task) => {
      data.push({
        id: task.id,
        title: task.title,
        remainingTime: task.remainingTime,
        priority: task.priority,
        status: task.status,
        created_at: new Date(task.created_at ?? "")
          .toLocaleString("pt-BR")
          .slice(0, -3),
        projectName: project.name,
        projectColor: `#${project.color?.toString(16)}`,
        projectId: project.id,
      });
    });
  });

  return <Table tasks={data}></Table>;
}

export default ProjectsList;
