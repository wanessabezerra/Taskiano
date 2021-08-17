import { api } from "./";
import type { TaskType } from "../../@types";

interface CreateProps {
  taskData: TaskType;
  token: string;
}

export const TaskRest = {
  async create(props: CreateProps): Promise<TaskType | undefined> {
    return api
      .post("/task/", props.taskData, {
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
  async get(id: string | undefined): Promise<TaskType | undefined> {
    return api
      .get("/task/", {
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
