import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Đường dẫn file data
const dataPath = path.join(__dirname, '../../data/users.data.json');

// Đọc danh sách user
function readUsers() {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, 'utf8');
  try {
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

// Ghi danh sách user
function writeUsers(users: any[]) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
}

// Lấy danh sách user
export function getAllUsers(req: Request, res: Response) {
  const users = readUsers().map((u: { [x: string]: any; password: any; }) => {
    const { password, ...rest } = u;
    return rest; // Không trả về password
  });
  res.json(users);
}

// Thêm user mới
export function addUser(req: Request, res: Response) {
  const { username, password, email, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Thiếu username hoặc password' });
  }
  const users = readUsers();
  if (users.find((u: { username: any; }) => u.username === username)) {
    return res.status(409).json({ message: 'Username đã tồn tại' });
  }
  const id = users.reduce((max: number, u: { id: number; }) => (u.id > max ? u.id : max), 0) + 1;
  const now = Date.now();
  const newUser = {
    id,
    username,
    password, // Thực tế nên hash password!
    email: email || '',
    role: role || 'user',
    createdAt: now,
    updatedAt: now
  };
  users.push(newUser);
  writeUsers(users);
  const { password: pw, ...rest } = newUser;
  res.status(201).json(rest);
}

// Xóa user
export function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  let users = readUsers();
  const idx = users.findIndex((u: { id: number; }) => u.id === id);
  if (idx === -1) return res.status(404).json({ message: 'User không tồn tại' });
  users.splice(idx, 1);
  writeUsers(users);
  res.json({ message: 'Đã xóa user' });
}

// Sửa user (chỉ admin)
export function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { username, email, role, currentUserRole } = req.body;

  if (currentUserRole !== 'admin') {
    return res.status(403).json({ message: 'Chỉ admin mới được sửa user!' });
  }

  let users = readUsers();
  const idx = users.findIndex((u: { id: number; }) => u.id === Number(id));
  if (idx === -1) return res.status(404).json({ message: 'User không tồn tại' });

  if (username) users[idx].username = username;
  if (email) users[idx].email = email;
  if (role) users[idx].role = role;
  users[idx].updatedAt = Date.now();

  writeUsers(users);
  const { password, ...rest } = users[idx];
  res.json(rest);
}