const { validationResult } = require("express-validator");
const {
  Product,
  Category,
  Subcategory,
  ProductImage,
} = require("../database/models");

module.exports = {
  index: (req, res) => {
    return res.render("admin/adminIndex", {
      session: req.session,
    });
  },
  /*  products: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        association: "subcategory",
                        include: {
                            association: "category"
                        }
                    }
                ]
            });
            
            return res.render("admin/adminProducts", {
                session: req.session,
                products
            })
        } catch (error) {
           console.log(error) 
        }
    },  */
  products: (req, res) => {
    Product.findAll({
      include: [
        {
          association: "subcategory",
          include: {
            association: "category",
          },
        },
      ],
    })
      .then((products) => {
        return res.render("admin/adminProducts", {
          session: req.session,
          products,
        });
      })
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    const CATEGORIES_PROMISE = Category.findAll();
    const SUBCATEGORIES_PROMISE = Subcategory.findAll();

    Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
      .then(([categories, subcategories]) => {
        return res.render("admin/adminProductCreateForm", {
          session: req.session,
          categories,
          subcategories,
        });
      })
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { name, price, discount, subcategory, description } = req.body;

      let newProduct = {
        name,
        price,
        description,
        discount,
        subcategory_id: subcategory,
      };
console.log(subcategory)
      Product.create(newProduct)
        .then((product) => {
          if (req.files.length === 0) {
            ProductImage.create({
              image: "default-image.png",
              product_id: product.id,
            }).then(() => {
              return res.redirect("/admin/products");
            });
          } else {
            const files = req.files.map((file) => {
              return {
                image: file.filename,
                product_id: product.id,
              };
            });
            ProductImage.bulkCreate(files).then(() => {
              return res.redirect("/admin/products");
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      const CATEGORIES_PROMISE = Category.findAll();
      const SUBCATEGORIES_PROMISE = Subcategory.findAll();

      Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([categories, subcategories]) => {
        
          return res.render("admin/adminProductCreateForm", {
            session: req.session,
            categories,
            subcategories,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },
  edit: (req, res) => {
    const productoid = req.params.id
    const productId = Product.findByPk(productoid);
    const categoriesAll = Category.findAll();
    const subcategoriesAll = Subcategory.findAll();

Promise.all([productId, categoriesAll, subcategoriesAll]).then(function([product, categories, subcategories]) {
  res.render("admin/adminProductEditForm", {
    categories:categories,
    subcategories:subcategories,
    product:product,
    session: req.session,
  });
})
    
  },
  update: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const productId = Number(req.params.id);
      const files = req.files.map((file) => file.filename);

      let { name, price, discount, category, subcategory, description } = req.body;
  console.log(subcategory)
  Product.update({
    name,
    price,
    discount,
    description,
    category, // corrigir nome da propriedade
    subcategory_id: subcategory // corrigir nome da propriedade
            // image: files.length > 0 ? files : product.image

      
        }, { 
        where: {
        id: req.params.id
      }
     });

      

      res.redirect("/admin/products");
    } else {
      Promise.all([productId, categoriesAll, subcategoriesAll]).then(function([product, categories, subcategories]) {

      res.render("admin/adminProductEditForm", {
        subcategories,
        categories,
        product,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      })});
    }
  },
  destroy: (req, res) => {
   // const productId = Number(req.params.id);
    ProductImage.destroy(
      {where : {
        product_id: req.params.id
      }
      }
    )
    Product.destroy( {
      where: {
        id: req.params.id
      }
       
    });

    res.redirect("/admin/products");
  },
};
