const { check, body, validationResult } = require("express-validator");
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
    .withMessage("Email inválido"),

    body('phone')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener 10 dígitos')
        .matches(/^[0-9]+$/).withMessage('El teléfono solo puede contener números')
    
]