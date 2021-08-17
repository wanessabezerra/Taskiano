import { ReactNode, useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { ProjectRest } from "../../services/api";

import { ProjectContext } from "./Provider";

import type { Project } from "../../@types";

interface ProjectContextProviderProps {
  children: ReactNode;
}

export function ProjectContextProvider(props: ProjectContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>();
  const { user } = useAuth();

  async function create(data: Project) {
    const project = await ProjectRest.create(data);
    if (project) setProjects([...(projects ?? []), project]);
  }

  useEffect(() => {
    ProjectRest.get(user?.id).then((data: Project[]) =>
      data ? setProjects([...data]) : null
    );
  }, [user?.id]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        create,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}
