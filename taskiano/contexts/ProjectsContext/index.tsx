import { ReactNode, useCallback, useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { ProjectsContext } from "./Provider";
import { ProjectController } from "../../lib";

import type { IProject } from "../../types";

interface IProjectsContextProvider {
  children: ReactNode;
}

export function ProjectsContextProvider(props: IProjectsContextProvider) {
  const [projects, setProjects] = useState<IProject[]>([]);

  const authenticated = useAuth((ctx) => ctx.authenticated);
  const user = useAuth((ctx) => ctx.user);

  const fetchProjects = useCallback(async () => {
    if (!user?.id) return;

    const _projects = await ProjectController.getDocsOfUser(user?.id);

    user && setProjects(_projects);
  }, [user]);

  const updateProjects = useCallback((changedProject: IProject) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === changedProject.id ? changedProject : project
      )
    );
  }, []);

  const get = useCallback(
    (id?: string) => projects.find((project) => project.id === id),
    [projects]
  );

  const create = useCallback(async (data: IProject) => {
    const project = await ProjectController.create(data);
    project && setProjects((prev) => [...prev, project]);
  }, []);

  const update = useCallback(
    async (id: string, data: IProject) => {
      const project = await ProjectController.update(id, data);
      project && updateProjects(project);
    },
    [updateProjects]
  );

  const archive = useCallback(async (id: string) => {
    await ProjectController.setArchived(id, true);
  }, []);

  const unArchive = useCallback(async (id: string) => {
    await ProjectController.setArchived(id, false);
  }, []);

  const getProjectColor = useCallback(
    (id: string) => {
      const project = projects.find((_project) => _project.id === id);

      return `#${project?.color?.toString(16)}`;
    },
    [projects]
  );

  const deleteProject = useCallback(async (id: string) => {
    await ProjectController.delete(id);
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  /**
   * Auto update tasks when project is updated
   */
  useEffect(() => {
    authenticated && fetchProjects();
  }, [authenticated, fetchProjects]);

  /**
   * Auto update tasks every 2 minutes since last update
   */
  useEffect(() => {
    return () =>
      clearTimeout(setTimeout(() => authenticated && fetchProjects(), 120000));
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
