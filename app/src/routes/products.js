const express = require("express");
const routes = express.Router();
const controller = require("../controllers/indexController");

routes.get("/productDetail/:id",controller.detail);
routes.get("/productCart", controller.cart);
routes.get("/login", controller.login);
routes.get("/register", controller.register);
routes.get("/create", controller.create);
// routes.post('/', controller.store); 
routes.get("/edit/:id", controller.edit);
routes.put("/edit/:id", controller.update);
routes.delete("/delete/:id", controller.delete);
module.exports = routes;