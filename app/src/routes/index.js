const express = require("express");
const router = express.Router();
const indexcontroller = require("../controllers/indexController");
const cookieCheck = require("../middlewares/cookieCheck");

router.get("/", cookieCheck, indexcontroller.index);
router.get("/search", indexcontroller.search);


// RUTAS LISTAS 
// routes.get("/productDetail/:id",productscontroller.detail);

// routes.get("/productCart", productscontroller.cart);
// routes.get("/create", productscontroller.create);

// routes.get("/edit", productscontroller.edit);
// routes.put("/edit/:id",productscontroller.update);
module.exports = router;





