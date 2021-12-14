import { useContextSelector } from "use-context-selector";
import {
  TasksContext,
  TasksContextType,
} from "../contexts/TasksContext/Provider";

export function useTasks(selector: (value: TasksContextType) => any): any {
  return useContextSelector(TasksContext, selector);
}
