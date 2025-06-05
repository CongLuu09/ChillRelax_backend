import fs from 'fs';
import path from 'path';
import { Mix } from '../models/mix.model';

const mixDataPath = path.join(__dirname, '../../data/mixes.data.json');

function readMixData(): Mix[] {
  try {
    if (!fs.existsSync(mixDataPath)) {
      // Nếu file chưa có, trả về mảng rỗng
      return [];
    }
    const raw = fs.readFileSync(mixDataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('❌ Error reading mix data:', error);
    return [];
  }
}

function writeMixData(mixes: Mix[]) {
  try {
    fs.writeFileSync(mixDataPath, JSON.stringify(mixes, null, 2));
  } catch (error) {
    console.error('❌ Error writing mix data:', error);
  }
}

export function getMixesByDevice(deviceId: string): Mix[] {
  return readMixData().filter(mix => mix.deviceId === deviceId);
}

export function getAllMixesService(): Mix[] {
  return readMixData();
}

export function addMix(mixInput: Omit<Mix, 'id' | 'createdAt'>): Mix {
  const mixes = readMixData();
  const newMix: Mix = {
    ...mixInput,
    id: mixes.length > 0 ? mixes[mixes.length - 1].id + 1 : 1,
    createdAt: new Date().toISOString(),
  };
  mixes.push(newMix);
  writeMixData(mixes);
  return newMix;
}

export function updateMix(
  id: number, 
  updatedFields: Partial<Omit<Mix, 'id' | 'deviceId' | 'createdAt'>>
): Mix | null {
  const mixes = readMixData();
  const index = mixes.findIndex(m => m.id === id);

  if (index === -1) return null;

  mixes[index] = {
    ...mixes[index],
    ...updatedFields
  };

  writeMixData(mixes);
  return mixes[index];
}

