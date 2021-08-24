import { createContext } from "react";
import type { Project, TaskType } from "../../@types";

type ProjectsContextType = {
  projects?: Project[];
  create: (project: Project) => void;
  closeTask: (task: TaskType) => void;
};

export const ProjectsContext = createContext({} as ProjectsContextType);
