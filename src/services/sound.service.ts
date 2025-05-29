import { Sound } from '../models/sound.model';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../../data/sounds.data.json');

export function getAllSounds(): Sound[] {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

export function getSoundsByCategory(category: string): Sound[] {
  const all = getAllSounds();
  return all.filter(sound => sound.category.toLowerCase() === category.toLowerCase());
}
export function getSoundsByIds(ids: number[]): Sound[] {
  const all = getAllSounds();
  return all.filter(sound => ids.includes(sound.id));
}
