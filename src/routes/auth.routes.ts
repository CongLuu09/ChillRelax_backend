import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();
const usersPath = path.join(__dirname, '../../data/users.data.json');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    let users = [];
    try {
      users = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Data error' });
    }
    const user = users.find(
        (      u: { username: string; password: any; }) => u.username && u.password &&
        u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
        u.password === password
    );
    if (!user) return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu!' });
    res.json({ user: { id: user.id, username: user.username, role: user.role, email: user.email } });
  });
});

export default router;