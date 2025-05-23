// Define types for authentication management

export type Auth = {
  id: string;
  userId: string;
  email: string;
  userRole: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  auth?: Auth | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FormData = {
  email: string;
  password: string;
  userRole: string;
  status: string;
};

export type AuthUpdateData = {
  email?: string;
  password?: string;
  userRole?: string;
  status?: string;
};