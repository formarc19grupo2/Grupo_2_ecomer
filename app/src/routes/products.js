const express = require("express");
const routes = express.Router();
const productscontroller = require("../controllers/productsController");
const {upload } = require('../middlewares/upload');



routes.get("/productDetail/:id",productscontroller.detail);
routes.get("/productCart", productscontroller.cart);


routes.get("/create", productscontroller.create);
routes.post("/", upload.single('image'), productscontroller.store);  

routes.get("/edit/:id", productscontroller.edit);
routes.put("/edit/:id", productscontroller.update);
routes.delete("/delete/:id", productscontroller.delete);

module.exports = routes;