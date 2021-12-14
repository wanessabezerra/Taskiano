interface IUser {
  id?: string;
  countCreatedTasks?: number;
  username?: string | null;
  name?: string | null;
  avatar?: string | null;
  birthday?: Date | null;
  email?: string | null;
}

export default IUser;
