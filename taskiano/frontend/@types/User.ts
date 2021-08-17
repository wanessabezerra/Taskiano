type User = {
  id: string;
  username?: string | null;
  name?: string | null;
  avatar?: string | null;
  birthday?: Date | null;
  score?: number | null;
  email?: string | null;
};

export default User;
