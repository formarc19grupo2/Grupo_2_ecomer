const { validationResult } = require("express-validator");
const fs = require("fs");
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
      let { name, price, discount,category, subcategory, description } = req.body;

      let newProduct = {
        name,
        price,
        description,
        discount,
        category_id: category,
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
    const productId = Product.findByPk(productoid,{
      include: [{ association: "subcategory", include: [{ association: "category" }] }]
    });
    const categoriesAll = Category.findAll({
      include: [{ association: "subcategories" }],
    });
    const subcategoriesAll = Subcategory.findAll({
      include: [{ association: "products" }, { association: "category" }],
    });

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
    const productId = req.params.id;

    if (errors.isEmpty()) {
     const files = req.files.map((file) => file.filename);

      let { name, 
            price, 
            discount, 
            category, 
            subcategory, 
            description } = req.body;
 
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
            id: productId,
          }
        }).then((result) => {
          if(result){
            // Si no reemplaza imagen
            if(req.files.length === 0){
              return res.redirect("/admin/products");
            } else {
              // 1- Obtener todas las imagenes del producto a actualizar
              ProductImage.findAll({
                where : {
                  product_id: productId
                }
              })
              .then((images) => {
                // 2- obtener el nombre de las imagenes a eliminar
                // 3- Eliminar los archivos
                images.forEach((productImage) => {
                  const MATCH = fs.existsSync("./public/images/productos/", productImage.image);
                  if(MATCH){
                    try {
                      fs.unlinkSync(`./public/images/productos/${productImage.image}`)
                    } catch (error) {
                      throw new Error(error)                    
                    }
                  }else{
                    console.log("No se encontró el archivo");
                  }
                })
                // 4- Eliminamos las imagenes de la DB (destroy)
                ProductImage.destroy({
                  where: {
                    product_id: productId,
                  }
                })
                .then(() => {
                  // 5- Crear los registros de las nuevas imagenes
                  const files = req.files.map((file) => {
                    return {
                      image: file.filename,
                      product_id: productId,
                    };
                  });
                  ProductImage.bulkCreate(files)
                  .then(() => {
                    return res.redirect("/admin/products");
                  });
                })
              })
            }
          }
        })
    } else {
      const productoid = req.params.id
      const productId = Product.findByPk(productoid,{
        include: [{ association: "subcategory", include: [{ association: "category" }] }]
      });
      const categoriesAll = Category.findAll({
        include: [{ association: "subcategories" }],
      });
      const subcategoriesAll = Subcategory.findAll({
        include: [{ association: "products" }, { association: "category" }],
      });
      Promise.all([productId, categoriesAll, subcategoriesAll])
      .then(function([product, categories, subcategories]) {
      res.render("admin/adminProductEditForm", {
        subcategories,
        categories,
        product,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      })})
      .catch(error => console.log(error))
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
