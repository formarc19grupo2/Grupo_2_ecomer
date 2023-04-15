const path = require("path");
const fs = require('fs');
const { validationResult } = require("express-validator");
const { readJSON, writeJson } = require("../database");
const products = readJSON("productsDataBase.json");
//const productsFilePath = path.join(__dirname,"../database/productsDataBase.json");
const { Product, category } = require("../database/models")



module.exports = {

    index: (req, res) => {
        return res.render("products/products", {
             products,
             session: req.session
        })
    },
    //lectura y enviar datos a vista de administrador
    products:(req, res) => {
      Product.findAll({
        include: [{
          association: "category",
        }]
      })
      .then((products)=>{
        return res.render("admin/adminIndex", {
          session: req.session,
          products
        })
      })

    },

    detail: (req, res) => {
        let productId = req.params.id;
        let product = products.find(product => product.id == productId);

        res.render("products/productDetail", {
            product,
            session: req.session
        })
    },

    cart: (req, res) => {
        return res.render("products/productCart", {
          session: req.session
        })
    },    

    create: (req, res) => {
        return res.render("products/create", {
          session: req.session
        })
    },

    store: (req, res) =>{
      let errors = validationResult(req);

      if(errors.isEmpty()) {

       let lastId = products[products.length -1].id;

		let newProduct = {
			id: lastId + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : ["default-image.png"]
		}
		products.push(newProduct);
    

		writeJson("productsDataBase.json",products); 

		//res.send(newProduct)
		res.redirect("/products/products");
    }else{
      res.render("products/create", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session
      })
    }},
    edit: (req, res) => {
        let productId = Number(req.params.id);

		const product = products.find(product => product.id === productId);

		return res.render("products/edit",{
            product,
            session: req.session
        })
    },
    update: (req, res) => {
		
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
      const { name, price, category, description, discount } = req.body;
      const products = readJSON("productsDataBase.json");

      const newProductsModify = products.map((product) => {
        if (product.id === +req.params.id) {
          let productModify = {
            ...product,
            name: name.trim(),
            price: +price,
            discount: +discount,
            category,
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

      return res.redirect("/products/products");
      
    } else {
      const products = readJSON("productsDataBase.json");

      const product = products.find((product) => product.id === +req.params.id);

      if (req.file) {
        fs.existsSync(`./public/images/${req.file.filename}`) &&
          fs.unlinkSync(`./public/images/${req.file.filename}`);
      }
      
      return res.render("./products/edit",{
       product,
        errors: errors.mapped(),
        old: req.body,
        session: req.session
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
            writeJson("productsDataBase.json", products)
    
            res.redirect("/products/products")
    }
}