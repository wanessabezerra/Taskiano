type TaskType = {
  id?: string;
  title?: string;
  number?: number;
  timer?: string | Date;
  remainingTime?: number;
  note?: string;
  fixed?: boolean;
  priority?: number;
  status?: string;
  created_at?: string | Date;
  closed_in?: string | Date;
  project?: string;
};

export default TaskType;
