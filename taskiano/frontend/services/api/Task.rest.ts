import { api } from "./";
import type { TaskType } from "../../@types";

export const TaskRest = {
  async create(data: TaskType, token?: string): Promise<TaskType | undefined> {
    return api
      .post("/task/", data, {
        headers: { Authorization: token },
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
  async update(
    id: string,
    data: TaskType,
    token?: string
  ): Promise<TaskType | undefined> {
    return api
      .patch(`/task/${id}/`, data, { headers: { Authorization: token } })
      .then(
        (res) => {
          return res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  async close(id: string, token?: string): Promise<TaskType | undefined> {
    return api
      .patch(
        `/task/${id}/`,
        { status: "2", closed_in: new Date().toISOString().split("T")[0] },
        { headers: { Authorization: token } }
      )
      .then(
        (res) => {
          return res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  async openTask(id: string, token?: string): Promise<TaskType | undefined> {
    return api
      .patch(
        `/task/${id}/`,
        { status: "1", closed_in: null },
        { headers: { Authorization: token } }
      )
      .then(
        (res) => {
          return res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  async get(projectId?: string, token?: string, page?: string): Promise<any> {
    return api
      .get(page ?? "/task/", {
        params: { project: projectId },
        headers: { Authorization: token },
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
  async deleteTask(id: string, token?: string): Promise<TaskType | undefined> {
    return api
      .delete(`/task/${id}/`, { headers: { Authorization: token } })
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
