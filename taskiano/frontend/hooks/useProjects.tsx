import { useContextSelector } from "use-context-selector";
import {
  ProjectsContext,
  ProjectsContextType,
} from "../contexts/ProjectsContext/Provider";

export function useProjects(selector: (value: ProjectsContextType) => any) {
  return useContextSelector(ProjectsContext, selector);
}
