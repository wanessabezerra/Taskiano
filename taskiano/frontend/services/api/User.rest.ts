import { api } from "./";
import type { User } from "../../@types";

export const UserRest = {
  async create(userData: User, token: string): Promise<User | undefined> {
    return api
      .post("/users/", userData, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  async get(id: string, token: string): Promise<User | undefined> {
    return api
      .get(`/users/${id}/`, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  async getScore(id?: string, token?: string | null): Promise<number | undefined> {
    return api
      .get(`/score/${id}/`, { headers: { Authorization: token } })
      .then((res) => res.data.score)
      .catch((error) => console.error(error));
  },
};
