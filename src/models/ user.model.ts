export interface User {
  id: number;
  username: string;
  password: string; // Nên hash khi lưu
  email?: string;
  role: 'admin' | 'user';
  createdAt: number; // milliseconds
  updatedAt: number; // milliseconds
}