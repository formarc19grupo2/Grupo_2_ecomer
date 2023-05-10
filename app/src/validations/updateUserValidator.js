const { check } = require("express-validator");
const { User } = require("../database/models");

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

    check("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"),

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Email inválido")
    
]