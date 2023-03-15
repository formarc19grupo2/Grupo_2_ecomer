const express = require("express");
const router = express.Router();
const footercontroller = require("../controllers/footerController");
const {upload} = require('../middlewares/upload');

router.get("/nuestraHistoria", footercontroller.historia);
router.get("/legales", footercontroller.legales);
router.get("/contacto", footercontroller.contacto);

module.exports = router;