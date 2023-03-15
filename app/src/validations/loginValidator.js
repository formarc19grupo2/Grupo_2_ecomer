const { check, body } = require("express-validator");
const { users } = require("../database");
const bcrypt = require("bcryptjs");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("Email es obligatorio").bail()
    .isEmail()
    .withMessage("Credenciales invalidas"),

    body("email")
    .custom(value => {
        let user = users.find(user => user.email === value)

        return user !== undefined;
    })
    .withMessage ("Email no registrado"),

    check('pass')
    .notEmpty()
    .withMessage('Contraseña es obligatoria'),

    body("pass")
    .custom((value, { req }) => {
        let user = users.find(user => user.email === req.body.email)

        return bcrypt.compareSync(value, user.pass);
    })
    .withMessage("Credenciales invalidas")
]