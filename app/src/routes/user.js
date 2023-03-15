const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");

/* GET - Login Form */
router.get("/login", userController.login); 
/*POST - Login User data */
router.post("/login", loginValidator, userController.processLogin);

/* GET - Register form */
router.get("/register", userController.register); 
/* POST - Register user data // primero multer luego validatos*/
router.post("/register", uploadAvatar.single("avatar"), registerValidator, userController.processRegister);

/*GET - User logout */
router.get("/logout", userController.logout)

module.exports = router;

