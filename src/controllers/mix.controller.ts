import { Request, Response } from 'express';
import { getMixesByDevice, addMix, updateMix } from '../services/mix.service';

export function getMixes(req: Request, res: Response) {
  const deviceId = req.query.deviceId as string;
  if (!deviceId) return res.status(400).json({ message: 'Missing deviceId' });

  const result = getMixesByDevice(deviceId);
  return res.json(result);
}

export function createMix(req: Request, res: Response) {
  console.log("📦 POST /api/mix body:", req.body); // ✅ THÊM LOG

  const { deviceId, name, soundIds } = req.body;

  if (!deviceId || !name || !Array.isArray(soundIds)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const mix = addMix({ deviceId, name, soundIds });
    return res.status(201).json(mix);
  } catch (error) {
    console.error("❌ Error saving mix:", error); // ✅ LOG LỖI
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export function updateMixById(req: Request, res: Response) {
      console.log("🧪 PUT /api/mix/", req.params.id, req.body);
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

  const { name, soundIds } = req.body;
  if (!name && !soundIds) {
    return res.status(400).json({ message: 'Nothing to update' });
  }

  try {
    const updated = updateMix(id, { name, soundIds });
    if (!updated) return res.status(404).json({ message: 'Mix not found' });

    return res.json(updated);
  } catch (error) {
    console.error('❌ Error updating mix:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


