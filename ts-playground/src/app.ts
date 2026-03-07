import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

// ─── Swagger UI ────────────────────────────────────────────────────────────
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Rutas ─────────────────────────────────────────────────────────────────
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// ─── Health check ──────────────────────────────────────────────────────────
app.get("/api/test", function (request, response) {
  response.json({ ok: true, message: "Mi API funciona!!!" });
});

app.listen(PORT, function () {
  console.log(`El servidor inicio en http://localhost:${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api/docs`);
});
