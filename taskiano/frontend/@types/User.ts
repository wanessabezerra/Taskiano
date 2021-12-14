type User = {
  id?: string;
  countCreatedTasks?: number;
  score?: number;
  username?: string | null;
  name?: string | null;
  avatar?: string | null;
  birthday?: Date | null;
  email?: string | null;
};

export default User;
