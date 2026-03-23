


export interface TUser {
  id: string;
  password: string;
  needPassword?: boolean;
  role?: "admin" | "student" | "faculity";
  status?: "in-progress" | "blocked";
  isDelete?: boolean;
}
