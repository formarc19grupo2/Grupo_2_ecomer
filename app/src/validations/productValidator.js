const { check, body } = require("express-validator");
const { productsDataBase } = require("../database");

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("price")
    .notEmpty()
    .withMessage("El precio es obligatorio"),

    check("discount")
    .notEmpty()
    .withMessage("El discuento es obligatorio"),


    check('category')
    .notEmpty()
    .withMessage('Debes seleccionar una categoria')
    ,

    check('description')
    .notEmpty()
    .withMessage('Pone una descripcion'),

    
]