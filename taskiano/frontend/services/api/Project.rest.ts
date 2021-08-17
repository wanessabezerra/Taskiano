import { api } from "./";
import type { Project } from "../../@types";

export const ProjectRest = {
  async create(data: Project): Promise<Project> {
    return api.post("/project/", data).then(
      (res) => {
        return res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  async get(id: string | undefined): Promise<Project[]> {
    return api.get("/project/", { params: { id } }).then(
      (res) => {
        return res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
