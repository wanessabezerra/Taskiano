import { createContext } from "use-context-selector";
import type { TaskType } from "../../@types";

export type TaskKey = {
  projectId: string;
  tasks: TaskType[];
};

export interface CreateTaskProps {
  data: TaskType;
  project?: string;
}

export type TasksContextType = {
  tasks: TaskKey[];
  update: (taskId: string, data: TaskType) => void;
  create: (data: TaskType) => Promise<void>;
  openTask: (id: string) => Promise<void>;
  close: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export const TasksContext = createContext({} as TasksContextType);
