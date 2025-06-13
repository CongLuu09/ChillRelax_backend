import fs from 'fs';
import path from 'path';
import { Category } from '../models/Category.model';

const dataPath = path.join(__dirname, '../../data/categories.json');

export class CategoryService {
  private categories: Category[] = [];

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(dataPath)) {
      this.categories = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
  }

  private save() {
    fs.writeFileSync(dataPath, JSON.stringify(this.categories, null, 2), 'utf-8');
  }

  getAll() {
    return this.categories;
  }

  getById(id: number) {
    return this.categories.find(c => c.id === id);
  }

  create(data: Category) {
    const newCategory = { ...data, id: Date.now() };
    this.categories.push(newCategory);
    this.save();
    return newCategory;
  }

  update(id: number, data: Partial<Category>) {
    const idx = this.categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...data };
    this.save();
    return this.categories[idx];
  }

  delete(id: number) {
    const idx = this.categories.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.categories.splice(idx, 1);
    this.save();
    return true;
  }
}