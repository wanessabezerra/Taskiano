import { createContext } from 'use-context-selector';
import type { Project } from "../../@types";

export type ProjectsContextType = {
  projects: Project[];
  create: (project: Project) => Promise<void>;
  archive: (project: string) => Promise<void>;
  unArchive: (project: string) => Promise<void>;
};

export const ProjectsContext = createContext({} as ProjectsContextType);
