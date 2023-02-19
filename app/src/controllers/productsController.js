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
        console.log(newProduct);

		writeJson(products); //escribe el JSON - y persiste 
		
		res.redirect("/");
    },
    edit: (req, res) => {
        let productId = Number(req.params.id);

		let productToEdit = products.find(product => product.id === productId);

		return res.render("products/edit",{
            productToEdit,
        })
    },
    update: (req, res) => {
		let productId = Number(req.params.id);

        products.forEach(element => {
            if(element.id === productId){
                element.name = req.body.name;
                element.price = req.body.price;
                element.discount = req.body.discount;
                element.category = req.body.category;
                element.description = req.body.description;
            }
        });

		writeJson(products);

        res.redirect("/");
	},
    delete: (req, res)=>{
            let productId = Number(req.params.id);
    
            products.forEach(product => {
                if(product.id === productId){
                    let productToDestroy = products.indexOf(product)
                    products.splice(productToDestroy, 1);
                }
            });
            writeJson(products)
    
            res.send("Producto eliminado correctamente")
    }
}