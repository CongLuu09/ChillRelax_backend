import { Request, Response } from 'express';
import { getAllSounds, getSoundsByCategory, getSoundsByIds } from '../services/sound.service';

export function getSounds(req: Request, res: Response) {
  const category = req.query.category as string | undefined;
  const idsParam = req.query.ids as string | undefined;

  // Ưu tiên lọc theo ids nếu có
  if (idsParam) {
    const ids = idsParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    return res.json(getSoundsByIds(ids));
  }

  if (category) {
    return res.json(getSoundsByCategory(category));
  }

  return res.json(getAllSounds());
}