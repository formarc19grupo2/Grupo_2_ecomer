const { check, body } = require("express-validator");
const { users } = require("../database");

module.exports = [  

    check("email")
    .notEmpty()
    .withMessage("Email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom(value => {
        let user = users.find(user => user.email === value)

        return user !== undefined;
    })
    .withMessage("Email invalido"),

    check('password')
    .notEmpty()
    .withMessage('Contraseña es obligatoria'),

    body("password")
    .custom((value, {req}) => {
        let user = users.find(user => user.email === req.body.email)

        return user.pass === value;
    })
   .withMessage("Contraseña invalida")
]