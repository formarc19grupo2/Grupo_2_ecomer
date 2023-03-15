const express = require("express");
const router = express.Router();
const productscontroller = require("../controllers/productsController");
const {upload } = require('../middlewares/upload');
const productsValidator = require("../validations/productValidator")


router.get("/products",productscontroller.index);

router.get("/productDetail/:id",productscontroller.detail);
router.get("/productCart", productscontroller.cart);


router.get("/create", productscontroller.create);
router.post("/", upload.single('image'),productsValidator, productscontroller.store);  

router.get("/edit/:id", productscontroller.edit);
router.put("/edit/:id", upload.single('image'),productsValidator, productscontroller.update);
router.delete("/delete/:id", productscontroller.delete);

module.exports = router;