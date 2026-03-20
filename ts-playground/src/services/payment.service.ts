import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { prisma } from "../lib/prisma";

// Init a MP
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
  options: { timeout: 5000 },
});

const preferenceApi = new Preference(mpClient);
const paymentApi = new Payment(mpClient);

interface CreatePreferenceInput {
  orderId: number;
  userId: number;
  userEmail: string;
}

export class PaymentService {
  async createPreference({
    orderId,
    userId,
    userEmail,
  }: CreatePreferenceInput) {
    // 1: Obtener la informacion de la orden
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
      include: {
        order_items: { include: { products: true } },
        users: { select: { id: true, email: true } },
      },
    });

    // verificar que la orden exista
    if (!order) throw new Error("Orden no encontrada.");
    // verificar que la orden este asociado a un usuario
    if (order.userId !== userId) throw new Error("No autorizado");
    if (order.status !== "PENDING") {
      throw new Error("Solo se puede pagar ordenes en estado PENDIENTE");
    }
  }

  async handleWebhook() {}

  async getPaymentStatus() {}
}
