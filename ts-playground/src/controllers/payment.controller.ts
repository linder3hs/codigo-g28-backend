import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { PaymentService } from "../services/payment.service";

const service = new PaymentService();

export class PaymentController {
  async createPreference(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const userEmail = req.user!.email;
      const { orderId } = req.body;

      if (!orderId) {
        return res
          .status(400)
          .json({ ok: false, message: "El orderId es un campo requerido." });
      }

      const result = await service.createPreference({
        orderId,
        userId,
        userEmail,
      });

      res.json({ ok: true, data: result });
    } catch (error: any) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }

  async webhook(req: AuthRequest, res: Response) {
    try {
      const { type, data } = req.body;

      if (type !== "payment") {
        return res.sendStatus(200);
      }

      const paymentId = data?.id;

      if (!paymentId) {
        return res
          .status(400)
          .json({ ok: false, message: "Payment id faltante." });
      }

      const result = await service.handleWebhook(String(paymentId));

      res.status(200).json({ ok: true, data: result });
    } catch (error: any) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }

  async getStatus(req: AuthRequest, res: Response) {
    try {
      const { paymentId } = req.params;
      const status = await service.getPaymentStatus(String(paymentId));

      res.json({ ok: true, data: status });
    } catch (error: any) {
      res.status(500).json({ ok: false, message: error.message });
    }
  }
}
