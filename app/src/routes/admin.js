const express = require("express");
const router = express.Router();
const {index} = require("../controllers/adminController");
const checkSessionAdmin = require("../middlewares/checkSessionAdmin");


router.get("/", checkSessionAdmin, index);

module.exports = router;