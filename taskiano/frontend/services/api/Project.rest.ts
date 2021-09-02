import { api } from "./";
import type { Project } from "../../@types";

export const ProjectRest = {
  async create(data: Project, token?: string): Promise<Project> {
    return api
      .post("/project/", data, {
        headers: {
          Authorization: token,
        },
      })
      .then(
        (res) => {
          return res.data.results;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  async get(id?: string, page?: string): Promise<Project[] | any> {
    return api
      .get(page ?? "/project/", {
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
  async archive(id: string, token?: string): Promise<boolean> {
    return api
      .post(
        `/project/${id}`,
        { has_archived: true },
        {
          params: {
            id: id,
          },
          headers: {
            Authorization: token,
          },
        }
      )
      .then(
        (res) => {
          return true;
        },
        (error) => {
          console.log(error);
          return false;
        }
      );
  },
  async unArchive(id: string, token?: string): Promise<boolean> {
    return api
      .post(
        `/project/${id}`,
        { has_archived: false },
        {
          params: {
            id: id,
          },
          headers: {
            Authorization: token,
          },
        }
      )
      .then(
        (res) => {
          return true;
        },
        (error) => {
          console.log(error);
          return false;
        }
      );
  },
};
