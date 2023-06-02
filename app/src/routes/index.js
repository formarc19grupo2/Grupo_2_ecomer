const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
const searchController = require('../controllers/searchController');

router.get("/", controller.index); 
router.get("/legales",controller.leg)
router.get("/history",controller.history)
router.get("/contact", controller.contact)
router.get("/cobros",controller.tarjetas)
/* Buscador*/


router.get('/search', searchController.getResults);




module.exports = router;