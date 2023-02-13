const express = require("express");
const routes = express.Router();
const indexcontroller = require("../controllers/indexController");
const productscontroller = require("../controllers/productsController");

routes.get("/", indexcontroller.index);


routes.get("/", indexcontroller.index);
routes.get("/productDetail/:id",productscontroller.detail);
routes.get("/productCart", productscontroller.cart);
routes.get("/login", indexcontroller.login);
routes.get("/register", indexcontroller.register);
routes.get("/create", productscontroller.create);
// routes.post('/', controller.store); 
routes.get("/edit", productscontroller.edit);
routes.put("/edit/:id",productscontroller.update);
module.exports = routes;

module.exports = routes;