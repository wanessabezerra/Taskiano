import { api } from "./";
import type { TaskType as Task } from "../../@types";

type TaskTypeRest = Task | undefined;

export const TaskRest = {
  async create(data: Task, token?: string): Promise<TaskTypeRest> {
    return api
      .post("/task/", data, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async delete(id: string, token?: string): Promise<TaskTypeRest> {
    return api
      .delete(`/task/${id}/`, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async update(id: string, data: Task, token?: string): Promise<TaskTypeRest> {
    return api
      .patch(`/task/${id}/`, data, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async open(id: string, token?: string): Promise<TaskTypeRest> {
    return api
      .patch(
        `/task/${id}/`,
        { status: "1", closed_in: null },
        { headers: { Authorization: token } }
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async close(id: string, token?: string): Promise<TaskTypeRest> {
    return api
      .patch(
        `/task/${id}/`,
        { status: "2", closed_in: new Date().toISOString().split("T")[0] },
        { headers: { Authorization: token } }
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async get(prjId?: string, token?: string, page?: string): Promise<any> {
    return api
      .get(page ?? "/task/", {
        params: { project: prjId },
        headers: { Authorization: token },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
};
