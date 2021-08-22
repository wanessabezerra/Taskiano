import { useContext } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext/Provider";

export function useProjects() {
  return useContext(ProjectsContext);
}
