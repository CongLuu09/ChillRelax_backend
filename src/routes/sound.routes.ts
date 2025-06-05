import express from 'express';

import { getSounds, getSoundsCountHandler } from '../controllers/sound.controller';



const router = express.Router();
/**
 * @swagger
 * /api/sounds/count:
 *   get:
 *     summary: Lấy tổng số âm thanh
 *     responses:
 *       200:
 *         description: Trả về tổng số âm thanh
 */
router.get('/count', getSoundsCountHandler);


/**
 * @swagger
 * /api/sounds:
 *   get:
 *     summary: Lấy danh sách âm thanh
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: "Lọc theo nhóm (ví dụ: Rain, Cafe)"
 *       - in: query
 *         name: ids
 *         schema:
 *           type: string
 *         description: "Lọc theo danh sách id, ví dụ: 1,4,7"
 *     responses:
 *       200:
 *         description: Trả về danh sách âm thanh
 */


router.get('/', getSounds);

export default router;
