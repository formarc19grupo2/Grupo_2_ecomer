const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { login, register, processRegister, processLogin } = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
/* GET - Login Form */
router.get("/login", userController.login); 
/*POST - Login User data */
router.post("/login", loginValidator, processLogin);

/* GET - Register form */
router.get("/register", register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister)

module.exports = router;

