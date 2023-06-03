const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { category } = require("../../database/models");
const fs = require('fs');

module.exports = {
    getCategories:(req, res) => {
        category.findAll()
        .then((result) => {
            return res.json(category)
        })
    }
}