import type { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const service = new CategoryService();

export class CategoryController {
  // getAll
  async getAll(req: Request, res: Response) {
    try {
      const categories = await service.getAll();
      res.json({ ok: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // getById
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await service.getById(id);

      if (!category) {
        return res
          .status(404)
          .json({ ok: false, message: "Categoría no encontrada" });
      }

      res.json({ ok: true, data: category });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // create
  async create(req: Request, res: Response) {
    try {
      const category = await service.create(req.body);
      res.status(201).json({ ok: true, data: category });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // update
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await service.update(id, req.body);
      res.json({ ok: true, data: category });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // destroy
  async destroy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.destroy(id);
      res.json({ ok: true, message: "Categoría eliminada" });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }
}
