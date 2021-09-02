import Task from "./Task";

type Project = {
  id?: string;
  name?: string;
  created_at?: Date;
  closed_in?: Date;
  description?: string;
  color?: number;
  hasArchived?: boolean;
  tasks?: Task[];
  user?: string;
};

export default Project;
