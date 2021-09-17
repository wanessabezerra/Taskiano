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

  const authenticated = useAuth((ctx) => ctx.authenticated);
  const token = useAuth((ctx) => ctx.token);

  const preFetchProjects = useCallback(async () => {
    let res = {} as any;

    do {
      res = await ProjectRest.get(token);
      res && setProjects(projects.concat(res.results));
    } while (res?.next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchTasks = useCallback(async () => {
    const _projects = [];
    let res = {} as any;

    do {
      res = await ProjectRest.get(token);
      res && _projects.push(...res.results);
    } while (res?.next);

    setProjects(_projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const updateDropTask = useCallback(
    (id: string) => {
      setProjects(projects.filter((project) => project.id !== id));
    },
    [projects]
  );

  const create = useCallback(
    async (data: Project) => {
      const project = await ProjectRest.create(data, token);
      project && setProjects(projects.concat(project));
    },
    [token, projects]
  );

  const update = useCallback(
    async (id: string, data: Project) => {
      const project = await ProjectRest.update(id, data, token);
      project && updateProjects(project);
    },
    [token, updateProjects]
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

  const getProjectColor = useCallback(
    (id: string) => {
      const project = projects.find((_project) => _project.id === id);
      const color = project?.color;

      return `#${color?.toString(16)}`;
    },
    [projects]
  );

  const get = useCallback(
    (id?: string) => projects.find((project) => project.id === id),
    [projects]
  );

  const deleteProject = useCallback(
    async (id: string) => {
      await ProjectRest.delete(id, token);
      updateDropTask(id);
    },
    [token, updateDropTask]
  );

  /**
   * Auto update tasks when project is updated
   */
  useEffect(() => {
    if (projects.length === 0 && authenticated) preFetchProjects();
    else if (token) updateProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  /**
   * Auto update tasks every 2 minutes since last update
   */
  useEffect(() => {
    return () =>
      clearTimeout(setTimeout(() => authenticated && updateProjects(), 120000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        get,
        create,
        update,
        deleteProject,
        archive,
        unArchive,
        getProjectColor,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
}
