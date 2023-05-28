const { Association } = require("sequelize");
const { Product, ProductImage,Sequelize } = require("../../database/models");
const { validationResult } = require("express-validator");
const { Op } = Sequelize;

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
        console.log(Product)
        try {
            const PRODUCTS = await Product.findByPk(PRODUCTS_ID, {
                include: {
                    model: ProductImage,
                    as: "images"
                },
            });
            
            if(PRODUCTS != null){
                const imageUrl = PRODUCTS.images.length > 0 ? `/api/products/${PRODUCTS_ID}/images` : '';
                return res.status(200).json({
                    endpoint: `/api/products/${PRODUCTS_ID}`,
                    id: PRODUCTS.id,
                    name: PRODUCTS.name,
                    description: PRODUCTS.description,
                    detail: imageUrl,
                  })

                
              } 
               return res.status(400).json(`El producto con id: ${PRODUCTS_ID} no existe`);
        } catch (error) {
            return res.status(500).send(error);
        }    
    },
    productsImage: async(req, res) => {
        let productId = Number(req.params.id);

        const productimg = ProductImage.findOne({
          where: { product_id: productId}});
    
        const PRODUCT_PROMISE = Product.findByPk(productId, {
          include: [{ association: "images" }],
        });
    
        const ALL_PRODUCTS_PROMISE = Product.findAll({
          where: {
            discount: {
              [Op.gte]: 10,
            },
          },
          include: [{ association: "images" }],
        });
    
        Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE,productimg])
          .then(([product, sliderProducts,productoimage]) => {
            console.log(productoimage.image)
            res.render("imgProducts", {
              sliderTitle: "Productos en oferta",
              sliderProducts,
              product,
              productoimage,
              session: req.session,
              
            });
          })
          .catch((error) => console.log(error));
  },
}
