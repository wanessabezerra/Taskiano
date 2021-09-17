import { createContext } from "use-context-selector";
import type { Project } from "../../@types";

export type ProjectsContextType = {
  projects: Project[];
  get: (id?: string) => Project | undefined;
  create: (data: Project) => Promise<void>;
  update: (id: string, data: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  archive: (id: string) => Promise<void>;
  unArchive: (id: string) => Promise<void>;
  getProjectColor: (id: string) => void;
};

export const ProjectsContext = createContext({} as ProjectsContextType);
