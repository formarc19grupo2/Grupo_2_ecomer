const express = require("express");
const router = express.Router();
const {detail, category, subcategory, cart, search} = require("../controllers/productController");

/* GET - Product Detail */
router.get('/detail/:id', detail)
/* GET - List products for category */
router.get("/category/:id", category); 
/* GET - List products by subcategory */
router.get("/subcategory/:id", subcategory); 

router.get("/search", search); 



module.exports = router;