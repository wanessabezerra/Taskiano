import { api } from "./";
import type { User } from "../../@types";

type UserP = User | undefined;

export const UserRest = {
  async create(userData: User, token: string): Promise<UserP> {
    return api
      .post("/users/", userData, {
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
  async get(id: string, token: string): Promise<UserP> {
    return api
      .get(`/users/${id}/`, {
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
};
