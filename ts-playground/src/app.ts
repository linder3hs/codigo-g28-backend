import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";
import stripeRoutes from "./routes/stripe.routes";
import CORS from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(CORS());

// ─── Swagger UI ────────────────────────────────────────────────────────────
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Rutas ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/stripe", stripeRoutes);

// ─── Health check ──────────────────────────────────────────────────────────
app.get("/api/test", function (request, response) {
  response.json({ ok: true, message: "Mi API funciona!!!" });
});

app.listen(PORT, function () {
  console.log(`El servidor inicio en http://localhost:${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api/docs`);
});
