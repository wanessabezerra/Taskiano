import axios from "axios";

import { UserRest } from "./User.rest";
import { TaskRest } from "./Task.rest";
import { ProjectRest } from "./Project.rest";
import { HistoryRest } from "./History.rest";

export { UserRest, TaskRest, ProjectRest, HistoryRest };

export const api = axios.create({
  baseURL: "http://127.0.0.1:4000/",
  // baseURL: "https://taskiano-backend.herokuapp.com/",
});
