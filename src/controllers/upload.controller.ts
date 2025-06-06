import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export function uploadFile(req: Request, res: Response) {
 
  if (
    !req.files ||
    !req.body.name ||
    !req.body.category
  ) {
    return res.status(400).json({ message: 'Thiếu thông tin upload' });
  }

 
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const fileImage = files.fileImage?.[0];
  const fileSound = files.fileSound?.[0];
  if (!fileImage || !fileSound) {
    return res.status(400).json({ message: 'Thiếu file upload' });
  }

 
  const now = new Date();
  const newSound = {
    id: Date.now(),
    name: req.body.name,
    fileSoundUrl: fileSound.path.replace(/\\/g, '/'),
    fileImageUrl: fileImage.path.replace(/\\/g, '/'),
    category: req.body.category,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  
  const dataPath = path.join(__dirname, '../../data/sounds.data.json');
  let sounds: any[] = [];
  if (fs.existsSync(dataPath)) {
    try {
      const raw = fs.readFileSync(dataPath, 'utf8');
      sounds = JSON.parse(raw) || [];
    } catch (e) {
      sounds = [];
    }
  }

  
  sounds.push(newSound);

 
  fs.writeFileSync(dataPath, JSON.stringify(sounds, null, 2), 'utf8');

 
  return res.status(201).json(newSound);
}