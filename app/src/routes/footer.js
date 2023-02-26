const express = require("express");
const routes = express.Router();
const footercontroller = require("../controllers/footerController");
const {upload } = require('../middlewares/upload');

routes.get("/nuestraHistoria", footercontroller.historia);
routes.get("/legales", footercontroller.legales);
routes.get("/contacto", footercontroller.contacto);

module.exports = routes;