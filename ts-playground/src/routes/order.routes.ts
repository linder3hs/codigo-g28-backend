import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new OrderController();

router.use(authMiddleware);

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.patch("/:id/status", (req, res) => controller.updateStatus(req, res));
router.delete("/:id", (req, res) => controller.destroy(req, res));

export default router;
