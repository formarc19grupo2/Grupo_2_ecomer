const path = require("path")
const products = require("../database/productsDataBase.json")


module.exports = {

    index: (req, res) => {
        return res.render("home",{
            products,
        })
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