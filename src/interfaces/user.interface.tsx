export interface AuthUser {
  user: SentUser;
  id: string;
}
export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  language: string;
  role: string;
  service?: string;
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export type SentUser = Omit<
  User,
  "password" | "createdAt" | "updatedAt" | "deleted" | "deleteDate"
>;
export type CreateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export type UpdateUser = Partial<CreateUser>;
