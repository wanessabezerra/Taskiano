import { api } from "./";
import type { User as UserType } from "../../@types";

interface CreateProps {
  userData: UserType;
  token: string;
}

export const UserRest = {
  async create(props: CreateProps): Promise<UserType | undefined> {
    return api
      .post("/users/", props.userData, {
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
  async get(id: string | undefined): Promise<UserType | undefined> {
    return api
      .get("/users/", {
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
