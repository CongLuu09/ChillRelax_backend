import { Sound } from '../models/sound.model';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../../data/sounds.data.json');

function readSoundData(): Sound[] {
  try {
    if (!fs.existsSync(dataPath)) {
      console.warn('Warning: sounds.data.json not found at', dataPath);
      return [];
    }
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading sound data:', error);
    return [];
  }
}

export function getAllSounds(): Sound[] {
  return readSoundData();
}

export function getSoundsCount(): number {
  return readSoundData().length;
}

export function getSoundsByCategory(category: string): Sound[] {
  const all = readSoundData();
  return all.filter(sound => sound.category.toLowerCase() === category.toLowerCase());
}

export function getSoundsByIds(ids: number[]): Sound[] {
  const all = readSoundData();
  return all.filter(sound => ids.includes(sound.id));
}
