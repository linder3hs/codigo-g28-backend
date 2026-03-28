import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { UploadController } from "../controllers/upload.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();
const controller = new ProductController();
const uploadController = new UploadController();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.destroy(req, res));

// imagenes
router.post("/:id/image", authMiddleware, upload.single("image"), (req, res) =>
  uploadController.uploadProductImage(req, res),
);

router.get("/:id/image", (req, res) =>
  uploadController.getProductImage(req, res),
);
export default router;
