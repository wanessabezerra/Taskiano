import { api } from "./";
import type { History } from "../../@types";

const baseURL = "/history";

export const HistoryRest = {
  async update(token?: string, data?: History): Promise<History | undefined> {
    return api
      .patch(`${baseURL}/1/`, data, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
  async get(token?: string): Promise<History | undefined> {
    return api
      .get(`${baseURL}/`, {
        headers: { Authorization: token },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
};
