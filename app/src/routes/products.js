const express = require("express");
const router = express.Router();
const productscontroller = require("../controllers/productsController");
const {upload } = require('../middlewares/upload');
const productsValidator = require("../validations/productValidator");
const checkUserInSession = require ("../middlewares/checkUserInSession")
const checkSessionAdmin = require("../middlewares/checkSessionAdmin")


router.get("/products",productscontroller.index);

router.get("/productDetail/:id",productscontroller.detail);
router.get("/productCart", productscontroller.cart);


router.get("/create", checkUserInSession,productsValidator, productscontroller.create);
router.post("/", upload.single('image'),productsValidator, productscontroller.store);  

router.get("/edit/:id", checkUserInSession, checkSessionAdmin , productscontroller.edit);
router.put("/edit/:id", upload.single('image'),productsValidator, productscontroller.update);
router.delete("/delete/:id", checkUserInSession, checkSessionAdmin,productscontroller.delete);

module.exports = router;