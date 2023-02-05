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

    detail: (req, res) => {
        let productId = req.params.id;
        let product = products.find(product => product.id == productId);

        res.render("products/productDetail", {
            product
        })
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
    store: (req, res) =>{
        let lastId = products[products.length -1].id;
		

		let newProduct = {
			id: lastId + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png",
		}
		products.push(newProduct);

		writeJson(products); //escribe el JSON - y persiste 
		
		res.redirect("/home/");
    },
    edit: (req, res) => {
        return res.render("products/edit")
    }
}