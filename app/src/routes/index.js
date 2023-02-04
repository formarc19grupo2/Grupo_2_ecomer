const express = require("express");
const routes = express.Router();
const controller = require("../controllers/indexController");

routes.get("/", controller.index);
routes.get("/productDetail",controller.detail);
routes.get("/productCart", controller.cart);
routes.get("/login", controller.login);
routes.get("/register", controller.register);
routes.get("/create", controller.create);
routes.get("/edit", controller.edit);
module.exports = routes;