import Task from "./Task";

type Project = {
  id?: string;
  name?: string;
  createDate?: Date;
  completeDate?: Date;
  description?: string;
  color?: string;
  hasArchived?: boolean;
  tasks?: Array<Task>;
};

export default Project;
