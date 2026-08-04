export type Role = "SUPERUSER" | "ADMIN" | "USER";

export type CurrentUser = {
  id: number;
  name: string;
  role: Role;
};

//one row (= one user) in users table at the admin dashboard
export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};
