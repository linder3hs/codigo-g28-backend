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

    // 2: Construir los items para MP
    const items = order.order_items.map((item) => {
      return {
        id: String(item.productId),
        title: item.products.name,
        description: item.products?.description ?? "",
        quantity: item.quantity,
        unit_price: Number(item.unitPrice),
        currency_id: "PEN", // SOLES PERUANOS
      };
    });

    // 3: Construir el preference para MP
    const response = await preferenceApi.create({
      body: {
        items,
        payer: { email: userEmail },
        external_reference: String(order.id),
        back_urls: {
          success: `${process.env.FRONT_URL}/payment/success`,
          pending: `${process.env.FRONT_URL}/payment/pending`,
          failure: `${process.env.FRONT_URL}/payment/failure`,
        },
        auto_return: "approved",
        notification_url: `${process.env.BACK_URL}/api/payment/webhook`,
        statement_descriptor: "G28 Shop",
        metadata: {
          order_id: orderId,
          user_id: userId,
        },
      },
    });

    await prisma.orders.update({
      where: { id: orderId },
      data: { mpPreferenceId: response.id },
    });

    return {
      preferenceId: response.id,
      initPoint: response.init_point,
      sandBoxInitPoint: response.sandbox_init_point,
    };
  }

  async handleWebhook() {}

  async getPaymentStatus() {}
}
