const path = require("path")

module.exports = {



    index: (req, res) => {
        return res.render("home")
    },

    detail: (req, res) => {
        return res.render("productDetail")
    },

    cart: (req, res) => {
        return res.render("productCart")
    },

    login: (req, res) => {
        return res.render("login")
    },

    register: (req, res) => {
        return res.render("register")
    }
}