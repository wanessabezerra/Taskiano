type TaskType = {
  id?: number;
  title?: string;
  timer?: Date | string | number;
  remainingTime?: number;
  note?: string;
  fixed?: boolean;
  priority?: number;
  status?: string;
  created_at?: Date | string;
  closedIn?: Date | string;
};

export default TaskType;
