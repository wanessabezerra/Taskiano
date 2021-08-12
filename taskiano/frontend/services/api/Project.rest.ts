import { api } from "./";
import type { default as ProjectType } from "../../@types/Project";

export const Project = {
  async create(data: ProjectType): Promise<ProjectType> {
    return api.post("/project/", data).then(
      (res) => {
        return res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  async get(id: string | undefined): Promise<ProjectType[]> {
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
