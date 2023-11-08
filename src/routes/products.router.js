import { Router } from "express";
import { ProductManager } from "../manager/ProductManager.js";
import socketServer from "../app.js";
const store = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    if (limit) {
      const products = await store.getProducts();
      const limitProducts = products.slice(0, parseInt(limit));
      res.render("home", {
        style: "products.css",
        products: limitProducts,
      });
    } else {
      const products = await store.getProducts();
      res.render("home", { style: "products.css", products });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const products = await store.getProductByID(id);
    console.log(products)
    res.render("home", { style: "products.css", products: { products } });
  } catch (error) {
    res.status(404).send({ error: "Producto no encontrado", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author, category, description, code, price, stock, thumbnails } = req.body;
    await store.addProduct(title, author, category, description, price, thumbnails, code, stock);
    socketServer.emit("productos", await store.getProducts());
    res.status(200).send({ message: "El producto ha sido agregado con éxito." });
  } catch (error) {
    res.status(404).send({
      error: "No se ha podido agregar el producto.",
      message: error.message,
    });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const { title, author, category, description, code, price, stock, thumbnails } = req.body;
    const newInfo = { title, author, category, description, price, code, stock, thumbnails };
    await store.updateProduct(id, newInfo);
    res.status(200).send("El producto ha sido actualizado con éxito.");
  } catch (error) {
    res.status(404).send({
      error: "No se pudo actualizar el producto.",
      message: error.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    await store.deleteProduct(id);
    socketServer.emit("productos", await store.getProducts());
    res.status(200).send(`Producto eliminado con éxito.`);
  } catch (error) {
    res.status(404).send({
      error: "No se pudo eliminar el producto.",
      message: error.message,
    });
  }
});

export default router;