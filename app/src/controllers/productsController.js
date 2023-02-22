const path = require("path");
const fs = require('fs');
const { validationResult } = require("express-validator");
const { readJSON, writeJson } = require("../database");

const productsFilePath = path.join(__dirname,"../database/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// const writeJson = (products) => {
// 	fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"})
// }


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
			image: req.file.filename ,
		}
		products.push(newProduct);
        console.log(newProduct);

		writeJson(products); //escribe el JSON - y persiste 

		//res.send(newProduct)
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
		// let productId = Number(req.params.id);

        // products.forEach(element => {
        //     if(element.id === productId){
        //         element.name = req.body.name;
        //         element.price = req.body.price;
        //         element.discount = req.body.discount;
        //         element.category = req.body.category;
        //         element.description = req.body.description;
        //     }
        // });

		// writeJson(products);

        // res.redirect("/");
        const errors = validationResult(req);

    if(req.fileValidatorError){
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }

    if (errors.isEmpty()) {
      const { name, price, category, description, discount, brand } = req.body;
      const products = readJSON("productsDataBase.json");

      const newProductsModify = products.map((product) => {
        if (product.id === +req.params.id) {
          let productModify = {
            ...product,
            name: name.trim(),
            price: +price,
            discount: +discount,
            category,
            brand,
            description: description.trim(),
            image: req.file ? req.file.filename : product.image,
          };

          if (req.file) {
            fs.existsSync(`./public/images/${product.image}`) &&
              fs.unlinkSync(`./public/images/${product.image}`);
          }

          return productModify;
        }
        return product;
      });

      writeJson("productsDataBase.json", newProductsModify);

      return res.redirect("/");
      
    } else {
      const products = readJSON("productsDataBase.json");

      const product = products.find((product) => product.id === +req.params.id);

      if (req.file) {
        fs.existsSync(`./public/images/${req.file.filename}`) &&
          fs.unlinkSync(`./public/images/${req.file.filename}`);
      }

      return res.render("edit", {
        ...product,
        brands,
        categories,
        errors: errors.mapped(),
        old: req.body,
      });
    }
  
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