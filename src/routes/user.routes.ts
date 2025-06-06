import express from 'express';
import { getAllUsers, addUser, deleteUser, updateUser } from '../controllers/user.controller';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách user
 *     responses:
 *       200:
 *         description: Trả về danh sách user (không có password)
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Thêm user mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Trả về user vừa tạo (không có password)
 *       409:
 *         description: Username đã tồn tại
 */
router.post('/', addUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa user theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     responses:
 *       200:
 *         description: Đã xóa user
 *       404:
 *         description: User không tồn tại
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Sửa thông tin user (chỉ admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               currentUserRole:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Đã sửa user
 *       403:
 *         description: Không có quyền
 *       404:
 *         description: User không tồn tại
 */
router.put('/:id', updateUser);

export default router;