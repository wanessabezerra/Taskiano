import { api } from "./";
import type { Project } from "../../@types";


export const ProjectRest = {
  async create(data: Project, token?: string): Promise<Project | undefined> {
    return api
      .post("/project/", data, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async get(id?: string, page?: string): Promise<Project[] | any> {
    return api
      .get(page ?? "/project/", { headers: { Authorization: id } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async update(id: string, data: Project, token?: string): Promise<Project | undefined> {
    return api
      .patch(`/project/${id}/`, data, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async archive(id: string, token?: string): Promise<boolean | void> {
    return api
      .post(
        `/project/${id}`,
        { has_archived: true },
        { params: { id: id }, headers: { Authorization: token } }
      )
      .then(() => true)
      .catch((error) => console.log(error));
  },
  async unArchive(id: string, token?: string): Promise<boolean | void> {
    return api
      .post(
        `/project/${id}`,
        { has_archived: false },
        { params: { id: id }, headers: { Authorization: token } }
      )
      .then(() => true)
      .catch((error) => console.log(error));
  },
  async delete(id: string, token?: string): Promise<any> {
    return api
      .delete(`/project/${id}/`, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
};
