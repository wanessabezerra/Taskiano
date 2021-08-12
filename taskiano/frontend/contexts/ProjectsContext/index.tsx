import { ReactNode, useEffect, useState } from "react";

import type Project from "../../@types/Project";
import { ProjectContext } from "./Provider";
import { useAuth } from "../../hooks/useAuth";
import { Project as ProjectRest } from "../../services/api/Project.rest";

interface ProjectContextProviderProps {
  children: ReactNode;
}

export function ProjectsContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>();
  const { user } = useAuth();

  useEffect(() => console.log(projects), [projects]);

  useEffect(() => {
    ProjectRest.get(user?.id).then((data: Project[] | null) => {
      if (data) setProjects([...data]);
    });
  }, [user?.id]);

  async function create(data: Project) {
    const project = await ProjectRest.create(data);

    if (project) setProjects([...(projects ?? []), project]);
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        create,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
