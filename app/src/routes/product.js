const express = require("express");
const router = express.Router();
const {detail, category, cart} = require("../controllers/productController");

/* GET - Product Detail */
router.get('/detail/:id', detail)
/* GET - List products for category */
router.get("/category/:id", category); 



module.exports = router;