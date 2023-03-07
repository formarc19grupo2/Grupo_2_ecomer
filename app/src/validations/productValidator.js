const { check, body } = require("express-validator");
const { productsDataBase } = require("../database");

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("price")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

    check("discount")
    .notEmpty()
    .withMessage("El email es obligatorio"),


    check('category')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .withMessage('La contraseña debe tener como mínimo 6 caracteres'),

    check('description')
    .notEmpty()
    .withMessage('Pone una descripcion'),

    
]