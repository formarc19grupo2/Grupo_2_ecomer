const { Product } = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
    getAll: async (req, res) =>{
        try {
            const PRODUCTS = await Product.findAll();

            const RESPONSE = {
                endpoint: "/api/products",
                data: PRODUCTS,
                total: PRODUCTS.length,
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
    }
}