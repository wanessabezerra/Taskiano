import { ReactNode, useCallback, useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { ProjectRest } from "../../services/api";

import { ProjectsContext } from "./Provider";

import type { Project } from "../../@types";
import type { NextRouter } from "next/router";

interface ProjectsContextProviderProps {
  router: NextRouter;
  children: ReactNode;
}

export function ProjectsContextProvider(props: ProjectsContextProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const token = useAuth((ctx) => ctx.token);

  const preFetchProjects = useCallback(async () => {
    let res = {} as any;

    do {
      res = await ProjectRest.get(token);
      setProjects(projects.concat(res.results));
    } while (res?.next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchTasks = useCallback(async () => {
    const _projects = [];

    let res = await ProjectRest.get(token);
    _projects.push(...(res?.results ?? []));

    while (res.next !== null) {
      res = await ProjectRest.get(token, res.next);
      _projects.push(...res.results);
    }

    setProjects(_projects);
  }, [token]);

  const updateProjects = useCallback(
    (project?: Project) => {
      project
        ? setProjects(
            projects.map((changedProject) =>
              changedProject.id === project.id ? project : changedProject
            )
          )
        : fetchTasks();
    },
    [fetchTasks, projects]
  );

  const create = useCallback(
    async (data: Project) => {
      const project = await ProjectRest.create(data, token);
      project && setProjects(projects.concat(project));
    },
    [token, projects]
  );

  const archive = useCallback(
    async (id: string) => {
      await ProjectRest.archive(id, token);
    },
    [token]
  );

  const unArchive = useCallback(
    async (id: string) => {
      await ProjectRest.unArchive(id, token);
    },
    [token]
  );

  /**
   * Auto update tasks when project is updated
   */
  useEffect(() => {
    if (projects.length === 0 && token) preFetchProjects();
    else if (token) updateProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /**
   * Auto update tasks every 2 minutes since last update
   */
  useEffect(() => {
    return () =>
      clearTimeout(setTimeout(() => token && updateProjects(), 120000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        create,
        archive,
        unArchive,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
}
