const path = require("path");
const fs = require('fs');
const { validationResult } = require("express-validator");

module.exports = {

    historia: (req, res) => {
        return res.render("./institucional/nuestraHistoria", {
            session: req.session
        })
    },

    legales: (req, res) => {
        return res.render("./institucional/legales", {
            session: req.session
        })
    },

    contacto: (req, res) => {
        return res.render("./institucional/contacto", {
            session: req.session
        })
    }
}