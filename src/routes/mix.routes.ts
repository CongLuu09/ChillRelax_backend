import express from 'express';
import { getMixes, getAllMixes, createMix, updateMixById } from '../controllers/mix.controller';

const router = express.Router();

/**
 * @swagger
 * /api/mix:
 *   get:
 *     summary: Lấy danh sách bản phối âm thanh theo thiết bị
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã thiết bị
 *     responses:
 *       200:
 *         description: Trả về danh sách mix theo deviceId
 */
router.get('/', getMixes);

/**
 * @swagger
 * /api/mix/all:
 *   get:
 *     summary: Lấy toàn bộ bản phối âm thanh (dành cho admin)
 *     responses:
 *       200:
 *         description: Trả về toàn bộ danh sách mix
 */
router.get('/all', getAllMixes);

/**
 * @swagger
 * /api/mix:
 *   post:
 *     summary: Tạo bản phối âm thanh mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deviceId
 *               - name
 *               - soundIds
 *             properties:
 *               deviceId:
 *                 type: string
 *               name:
 *                 type: string
 *               soundIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Trả về bản phối vừa tạo
 */
router.post('/', createMix);

/**
 * @swagger
 * /api/mix/{id}:
 *   put:
 *     summary: Cập nhật bản phối theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID bản phối
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               soundIds:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Bản phối đã cập nhật
 *       404:
 *         description: Không tìm thấy bản phối
 */
router.put('/:id', updateMixById);

export default router;
