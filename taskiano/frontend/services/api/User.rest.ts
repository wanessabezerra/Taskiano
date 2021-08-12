import { api } from "./";
import type { default as UserType } from "../../@types/User";

export const User = {
  async create(data: UserType): Promise<UserType | undefined> {
    return api.post("/users/", data).then(
      (res) => {
        return res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  async get(id: string): Promise<UserType | undefined> {
    return api.get("/users/", { params: { id } }).then(
      (res) => {
        return res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
