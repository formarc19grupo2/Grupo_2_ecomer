//const { products, categories } = require("../old_database");
const { Product, Category, Sequelize, ProductImage } = require("../database/models");
const { Op } = Sequelize;

module.exports = {
  detail: (req, res) => {
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
        res.render("productDetail", {
          sliderTitle: "Productos en oferta",
          sliderProducts,
          product,
          productoimage,
          session: req.session,
          
        });
      })
      .catch((error) => console.log(error));
  },
  category: (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId, {
      include: [
        {
          association: "subcategories",
          include: {
            association: "products",
            include: { association: "images" },
          },
        },
      ],
    })
      .then((category) => {
        const PRODUCTS = category.subcategories.map(
          (subcategory) => subcategory.products
        );
        return res.render("categories", {
          category,
          subcategories: category.subcategories,
          products: PRODUCTS.flat(),
          session: req.session,
        });
      })
      .catch((error) => console.log(error));
  },

  cart: (req, res) => {
    return res.render("users/productCart")
  },

};
