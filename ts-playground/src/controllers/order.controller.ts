import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { OrderService } from "../services/order.service";

const service = new OrderService();

export class OrderController {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const rol = req.user!.rol;
      const orders = await service.getAll(userId, rol);
      res.json({ ok: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      const userId = req.user!.id;
      const rol = req.user!.rol;
      const order = await service.getById(id, userId, rol);

      if (!order) {
        return res.status(404).json({ ok: false, data: "Order not found" });
      }

      res.json({ ok: true, data: order });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          ok: false,
          data: "Se require al menos 1 item para crear la orden.",
        });
      }

      const order = await service.create(userId!, items);
      res.status(201).json({ ok: true, data: order });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      const order = await service.updateStatus(id, status);
      res.json({ ok: true, data: order });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  async cancelOrder(req: AuthRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      const userId = req.user!.id;
      const order = await service.cancelOrder(id, userId);
      res.json({ ok: true, data: order });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  async softDelete(req: AuthRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      const order = await service.softDelete(id);
      res.json({ ok: true, data: order });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  async getArchived(req: AuthRequest, res: Response) {
    try {
      const orders = await service.getArchived();
      res.json({ ok: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }

  // async destroy(req: AuthRequest, res: Response) {
  //   try {
  //     const id = Number(req.params.id);
  //     await service.destroy(id);
  //     res.json({ ok: true, data: "Order deleted" });
  //   } catch (error: any) {
  //     res.status(500).json({ ok: false, error: error.message });
  //   }
  // }
}
