import { createContext } from "react";
import Project from "../../@types/Project";

type ProjectContextType = {
  projects: Project[] | undefined;
  create: (project: Project) => void;
};

export const ProjectContext = createContext({} as ProjectContextType);
