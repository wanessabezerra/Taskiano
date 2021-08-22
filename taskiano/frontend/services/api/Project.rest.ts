import { api } from "./";
import type { Project } from "../../@types";

interface CreateProps {
  data: Project;
  token?: string;
}

export const ProjectRest = {
  async create(props: CreateProps): Promise<Project> {
    return api
      .post("/project/", props.data, {
        headers: {
          Authorization: props.token,
        },
      })
      .then(
        (res) => {
          return res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  async get(id: string | undefined): Promise<Project[]> {
    return api
      .get("/project/", {
        headers: {
          Authorization: id,
        },
      })
      .then(
        (res) => {
          return res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
};
