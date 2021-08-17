import { createContext } from "react";
import type { Project } from "../../@types";

type ProjectContextType = {
  projects: Project[] | undefined;
  create: (project: Project) => void;
};

export const ProjectContext = createContext({} as ProjectContextType);
