import { ReactNode, useState } from "react";

import useSWR from "swr";

import { useAuth } from "../../hooks/useAuth";
import { ProjectRest, TaskRest } from "../../services/api";

import { ProjectsContext } from "./Provider";

import type { Project } from "../../@types";

interface ProjectsContextProviderProps {
  children: ReactNode;
}

const mock_projects = [
  { name: "UFRN" },
  { name: "Curso Técnico IMD" },
  { name: "Lista de Compras" },
  { name: "Trabalho" },
  { name: "Curso Online" },
  { name: "Curso Online" },
  { name: "Curso Online" },
  { name: "Curso Online" },
  { name: "Curso Online" },
  { name: "Curso Online" },
];

export function ProjectsContextProvider(props: ProjectsContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>();
  const { getToken } = useAuth();

  useSWR("task/", async () => {
    let tasks: any = await TaskRest.get(await getToken());
    let projects = [] as Project[];

    for (var task of tasks) {
      const dateInit = new Date(task.timer);
      const dateCurr = new Date();

      const diff = Number(dateInit) - Number(dateCurr);

      task.remainingTime = Math.abs(diff / 1000);
    }

    for (var project of mock_projects) {
      projects.push({
        name: project.name,
        tasks: tasks,
      });
    }

    setProjects(projects);
  });

  async function create(data: Project) {
    const token = await getToken();
    const project = await ProjectRest.create({ data, token });
    if (project) setProjects([...(projects ?? []), project]);
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        create,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
}
