const path = require("path")

module.exports = {

    index: (req, res) => {
        return res.render("home")
    },

    detail: (req, res) => {
        return res.render("products/productDetail")
    },

    cart: (req, res) => {
        return res.render("products/productCart")
    },

    login: (req, res) => {
        return res.render("users/login")
    },

    register: (req, res) => {
        return res.render("users/register")
    },
    create: (req, res) => {
        return res.render("products/create")
    },
    edit: (req, res) => {
        return res.render("products/edit")
    }
}