const express = require ("express");
const router = express.Router();
const {getAll,getOne,store} = require("../../controllers/api/productsApi")

router
    .get("/", getAll)
    .get("/:id", getOne)
    // .post("/api/products",store)

module.exports = router;