const express = require("express");
const authMiddleware = require("../midddleware/authMiddleware");
const {
  getAllProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  fetchProductByIdController,
} = require("../controllers/productController");
const productRouter = express.Router();

productRouter.post("/create-product", authMiddleware, createProductController);
productRouter.get("/all-products/:id", authMiddleware, getAllProductController);
productRouter.get("/product/:id", authMiddleware, fetchProductByIdController);
productRouter.post(
  "/update-product/:id",
  authMiddleware,
  updateProductController,
);
productRouter.post(
  "/delete-product/:id",
  authMiddleware,
  deleteProductController,
);

module.exports = productRouter;
