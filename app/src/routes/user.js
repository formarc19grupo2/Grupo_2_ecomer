const express = require("express");
const router = express.Router();
const {login,processLogin, register,processRegister,logout,profile,editProfile} = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const checkSessionUser = require("../middlewares/checkSessionUser");
const checkUserInSession = require("../middlewares/checkUserInSession");

/* GET - Login Form */
router.get("/login", checkSessionUser , login); 
/*POST - Login User data */
router.post("/login", loginValidator, processLogin);


/* GET - Register form */
router.get("/register", checkSessionUser , register); 
/* POST - Register user data // primero multer luego validatos*/
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister);

/*GET - User logout */
router.get("/logout", logout)

/*GET - User profile */
router.get("/profile", profile)

/* GET - User edit form */
router.get("/profile/edit", checkUserInSession, editProfile);



module.exports = router;

