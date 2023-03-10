const path = require("path");
const fs = require('fs');
const { validationResult } = require("express-validator");

module.exports = {

    historia: (req, res) => {
        return res.render("./institucional/nuestraHistoria")
    },

    legales: (req, res) => {
        return res.render("./institucional/legales")
    },

    contacto: (req, res) => {
        return res.render("./institucional/contacto")
    }
}