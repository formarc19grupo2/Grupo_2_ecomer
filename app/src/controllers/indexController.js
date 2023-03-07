const path = require("path");
const fs = require('fs');

const productsFilePath = path.join(__dirname,"../database/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"})
}


module.exports = {

    index: (req, res) => {
        return res.render("home",{
            products,
        })
    },    

    login: (req, res) => {
        return res.render("users/login")
    },

    register: (req, res) => {
        return res.render("users/register")
    },

    search: (req, res) => {
        const { keywords } = req.query
        const results = products.filter(product => product.name == keywords)
       // res.send(keywords)
        res.render("products/results", {
            keywords,
            results,
        })
    },
};