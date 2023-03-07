const express = require("express");
const routes = express.Router();
const indexcontroller = require("../controllers/indexController");


routes.get("/", indexcontroller.index);
routes.get("/login", indexcontroller.login);
routes.get("/register", indexcontroller.register);

routes.get("/search", indexcontroller.search);


// RUTAS LISTAS 
// routes.get("/productDetail/:id",productscontroller.detail);

// routes.get("/productCart", productscontroller.cart);
// routes.get("/create", productscontroller.create);

// routes.get("/edit", productscontroller.edit);
// routes.put("/edit/:id",productscontroller.update);
module.exports = routes;





