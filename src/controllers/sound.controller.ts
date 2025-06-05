import { Request, Response } from 'express';
import { getAllSounds, getSoundsByCategory, getSoundsByIds, getSoundsCount } from '../services/sound.service';

export function getSounds(req: Request, res: Response) {
  try {
    const category = req.query.category as string | undefined;
    const idsParam = req.query.ids as string | undefined;

    if (idsParam) {
      const ids = idsParam
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id));

      if (ids.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid ids parameter' });
      }

      const sounds = getSoundsByIds(ids);
      return res.json(sounds); // Trả về mảng thuần
    }

    if (category) {
      const sounds = getSoundsByCategory(category);
      return res.json(sounds); // Trả về mảng thuần
    }

    const allSounds = getAllSounds();
    return res.json(allSounds); // Trả về mảng thuần
  } catch (error) {
    console.error('Error in getSounds:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export function getSoundsCountHandler(req: Request, res: Response) {
  try {
    const count = getSoundsCount();
    return res.json({ count }); // Trả về object chỉ chứa count
  } catch (error) {
    console.error('Error in getSoundsCountHandler:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
