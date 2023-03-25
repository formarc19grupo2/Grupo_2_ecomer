const { check, body } = require("express-validator");
const { productsDataBase } = require("../database");

module.exports = [
    check("name")
        .notEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({ min: 3, max: 30 }).withMessage("El nombre debe tener entre 3 y 30 caracteres"),

        check("price")
        .isInt({min:1}).withMessage("Debes indicar un precio"),

    check("discount")
    .notEmpty()
    .withMessage("El discuento es obligatorio"),


   /* check('category')
    .notEmpty()
    .withMessage('Debes seleccionar una categoria')
    ,*/

    check("description")
        .notEmpty().withMessage("La descripción es obligatoria").bail()
        .isLength({ min: 20}).withMessage("La descripción debe tener mínimo 20 caracteres"),

    
]