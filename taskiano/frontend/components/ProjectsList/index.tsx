import React from "react";

import { Project } from "../../@types";

import Table, { TaskProps } from "./Table";

interface ProjectsListProps {
  projects?: Array<Project>;
}

function ProjectsList(props: ProjectsListProps) {
  const data = props.projects?.map((project) => {
    for (const task of project.tasks ?? []) {
      return {
        id: task.id,
        name: task.title,
        remainingTime: task.remainingTime,
        priority: task.priority,
        created_at: new Date(task.created_at ?? "")
          .toLocaleString("pt-BR")
          .slice(0, -3),
        project: project.name,
        projectColor:"#832CFF"
      };
    }
  }) as TaskProps[];

  return <Table tasks={data}></Table>;
}

export default ProjectsList;
