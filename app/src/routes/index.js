const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
const searchController = require('../controllers/searchController');

router.get("/", controller.index); 

/* Buscador*/


router.get('/search', searchController.getResults);




module.exports = router;