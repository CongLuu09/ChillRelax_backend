import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/Category.model";

const categoryService = new CategoryService();

export class CategoryController {

  getAll = (req: Request, res: Response) => {
    const categories = categoryService.getAll();
    res.json(categories);
  };

  getById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const category = categoryService.getById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  };

  create = (req: Request, res: Response) => {
  try {
    const data = req.body as Category;


    if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

  
    const newCategory = categoryService.create(data);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

  update = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const updatedData = req.body as Partial<Category>;
    const updatedCategory = categoryService.update(id, updatedData);
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  };

  delete = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const success = categoryService.delete(id);
    if (!success) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(204).send();
  };


 
uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file received' });
  }
  const fileUrl = `/categories/${req.file.filename}`;
  res.json({ url: fileUrl });
};



}