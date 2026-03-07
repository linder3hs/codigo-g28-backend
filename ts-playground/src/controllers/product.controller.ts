import type { Request, Response } from "express";
import { ProductService } from "../services/product.service";

// instanciar ProductService
const service = new ProductService();

// req: request
// res: response

export class ProductController {
  // getAll
  async getAll(req: Request, res: Response) {
    try {
      const products = await service.getAll();
      res.json({ ok: true, data: products });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // getByID
  async getById(req: Request, res: Response) {
    try {
      // obtener el id de la url
      const id = Number(req.params.id);
      const product = await service.getById(id);

      if (!product) {
        return res
          .status(404)
          .json({ ok: false, message: "Producto no encontrado" });
      }

      res.json({ ok: true, data: product });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // create
  async create(req: Request, res: Response) {
    try {
      const product = await service.create(req.body);
      res.status(201).json({ ok: true, data: product });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // update
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await service.update(id, req.body);
      res.json({ ok: true, data: product });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // delete
  async destroy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.destroy(id);
      res.json({ ok: true, message: "Product eliminado" });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }
}
