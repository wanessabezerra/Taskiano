import { createContext } from "react";
import type { Project } from "../../@types";

type ProjectsContextType = {
  projects?: Project[];
  create: (project: Project) => void;
};

export const ProjectsContext = createContext({} as ProjectsContextType);
