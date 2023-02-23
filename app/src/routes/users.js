const express = require("express");
const routes = express.Router();
const userscontroller = require("../controllers/usersController");
const {upload } = require('../middlewares/upload');



routes.get("/userDetail/:id",userscontroller.detail);



routes.get("/create", userscontroller.create);
routes.post("/", upload.single('image'), userscontroller.store);  

routes.get("/edit/:id", userscontroller.edit);
routes.put("/edit/:id", upload.single('image'), userscontroller.update);
routes.delete("/delete/:id", userscontroller.delete);

module.exports = routes;

