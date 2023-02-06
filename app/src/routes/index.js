const express = require("express");
const routes = express.Router();
const controller = require("../controllers/indexController");

routes.get("/", controller.index);


routes.get("/", controller.index);
routes.get("/productDetail/:id",controller.detail);
routes.get("/productCart", controller.cart);
routes.get("/login", controller.login);
routes.get("/register", controller.register);
routes.get("/create", controller.create);
// routes.post('/', controller.store); 
routes.get("/edit", controller.edit);
routes.put("/edit/:id",controller.update);
module.exports = routes;

module.exports = routes;