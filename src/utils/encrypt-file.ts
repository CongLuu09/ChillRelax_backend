import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.ENCRYPT_KEY || 'default-key', 'salt', 32); // 256-bit
const iv = Buffer.alloc(16, 0); // Khởi tạo vector

export function encryptFile(inputPath: string, outputPath: string) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(cipher).pipe(output);
}

export function decryptFile(inputPath: string, outputPath: string) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(decipher).pipe(output);
}
