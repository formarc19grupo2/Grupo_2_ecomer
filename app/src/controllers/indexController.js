const path = require("path")
const products = require("../database/productsDataBase.json")


module.exports = {

    index: (req, res) => {
        return res.render("home",{
            products,
        })
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