const { Product } = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
    getAll: async (req, res) =>{
        try {
            const PRODUCTS = await Product.findAll();

            const RESPONSE = {
                endpoint: "/api/products",
                PRODUCTS: PRODUCTS,
                count: PRODUCTS.length,
            };

            return res.status(200).json(RESPONSE);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getOne: async (req, res) => {
        const PRODUCTS_ID = req.params.id;

        try {
            const PRODUCTS = await Product.findByPk(PRODUCTS_ID);

            if(PRODUCTS != null){
                return res.status(200).json({
                    endpoint: `/api/products/${PRODUCTS_ID}`,
                    data: PRODUCTS,
                  })
              } 
               return res.status(400).json(`El producto con id: ${PRODUCTS_ID} no existe`);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    store: async (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let { name, price, discount,category, subcategory, description } = req.body;

            let newProduct = {
              name,
              price,
              description,
              discount,
              category_id: category,
              subcategory_id: subcategory,
            };
          
          try {
            const RESULT = await Product.create(newProduct);

            const RESPONSE = {
                endpoint: "/api/product",
                data: RESULT,
                msg: "Producto agregado correctamente",
            }

            res.status(201).json(RESPONSE);
          } catch (error) {
            res.status(500).send(error)
          };
        } else {
          return res.status(400).json(errors.mapped());
        }
    },

    

}
