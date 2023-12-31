import { Router } from "express";
import { ProductManager } from "../manager/ProductManager.js";
const router = Router();
const store = new ProductManager();

router.get("/", async (req, res) => {
  const products = await store.getProducts();

  res.render("realtimeproducts",{ style: "products.css" });
});

export default router;