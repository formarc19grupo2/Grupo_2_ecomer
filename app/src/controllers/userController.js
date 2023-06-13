//const { users, writeUsersJson } = require("../old_database");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User, Order, sequelize, Product } = require("../database/models");
const {Op} = sequelize;
const {getOderByUser, getOrderByUser, insertOrder } = require('../services/order.service')
const {getOrderItemsByProduct, updateOrderItem, insertOrderItem } =  require('../services/orderItems.service')

const fs = require('fs');
const { create } = require("domain");





module.exports = {
    login: (req, res) => {
        res.render("user/login", { session: req.session })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then((user)  => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    rol: user.rol
                }

                let tiempoDeVidaCookie = new Date(Date.now() + 60000);

                if(req.body.remember) {
                    res.cookie(
                        "userEcomer", 
                        req.session.user, 
                        {
                            expires: tiempoDeVidaCookie,
                            httpOnly: true
                        })
                }
    
                res.locals.user = req.session.user;
               
           let userInSessionimg = req.session.user.avatar
           const pathArquivo = './public/images/avatar/'+userInSessionimg;
                console.log(pathArquivo)
    
                res.redirect("/");
            })
            .catch(error => console.log())
        } else {
           
            return res.render("user/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        res.render("user/register", {session: req.session})
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            
            let newUser = {
             name: req.body.name,
             last_name: req.body.last_name,
             email: req.body.email,
             pass: bcrypt.hashSync(req.body.pass1, 12),
             avatar: req.file ? req.file.filename : "default-image.png",
             rol: 0,
             phone: ""
            };

            User.create(newUser)
            .then(() => {
               return res.redirect("/users/login");
            })
            .catch(error => console.log(error))
        } else {
            res.render("user/register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.userEcomer){
            res.cookie("userEcomer", "", {maxAge: -1})
        }

        res.redirect("/");

    },
    profile: (req, res) => {
        let userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
        .then((user) => {
            res.render("user/userProfile", {
                user,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },

    editProfile: (req, res) => {
        let userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
        .then((user) => {
            res.render("user/userProfileEdit", {
            user,
            session: req.session
        })
        })
        .catch(error => console.log(error))
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let userId = req.session.user.id;
          //  let user = User.findByPk(user => user.id === userId);

            const {
                name,
                last_name,
                phone,
               
            } = req.body;
        User.update({
            name,
            last_name,
            phone,
            
            avatar: req.file ? req.file.filename : User.avatar
        }, {
            where: {
                id: userId
            }
        })

            return res.redirect("/users/profile");
        } else {
            const userInSessionId = req.session.user.id;
            User.findByPk(userInSessionId)
              .then(userInSession => {
                const { name, last_name, phone } = req.body;
          
                return res.render("user/userProfileEdit", {
                  user: userInSession,
                  session: req.session,
                  errors: errors.mapped(),
                  formData: { name, last_name, phone }
                });
              })
              .catch(error => {
                console.error(error);
                return res.status(500).send("Ocorreu um erro ao buscar os dados do usuário.");
              });
          }
          
    },
    destroy: (req, res) => {
        // obtengo el id del req.params
        let userInSessionId = req.session.user.id
        User.destroy({
            where: {
                id: req.params.id,
                id: userInSessionId
            }
        })
        .then(() => {
            let userInSessionimg = req.session.user.avatar
            const pathArquivo = './public/images/avatar/'+userInSessionimg;
    
            fs.unlinkSync(pathArquivo, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Arquivo apagado com sucesso!');
            });
    
            req.session.destroy();
            if(req.cookies.userEcomer){
                res.cookie("userEcomer", "", {maxAge: -1})
            }
            res.redirect("/");
        })
        .catch((error) => console.log(error));
    },

 cart: (req, res) => {
        return res.render("user/productCart", { session: req.session })
      },

    // cart: async (req, res) => {
    //    try{
    //         const idUser = req.session.user.id;
    //         const order = getOderByUser(idUser)

    //         res.render("products/carrito", {Order, session: req.session});
    //    } catch(error){
    //         return res.status(500).json({Error: `Error en el servidor ${error}`})
    //    }
    // },
    // addOrder: async (req, res) => {
    //     try {
    //         const idUser = req.session.user.id;
    //         const order = await getOderByUser(idUser)
    //         const idProduct = req.params.idProduct;
    //         const quantity = req.body.quantity;
    //         if(order){
    //             let dataItem;

    //             const idOrder = order.orderId;
    //             const item = await getOrderItemsByProduct(idProduct);
    //             if(item){
    //                 dataItem = {
    //                     idOrder,
    //                     idProduct,
    //                     quantity: item.quantity + quantity,
    //                 };

    //                 const updateOrder = await updateOrderItem(dataItem, item.orderId);
    //                 return res.status(200).json("producto incrementado");
    //             }else{
    //                 dataItem = {
    //                     idOrder,
    //                     idProduct,
    //                     quantity,

    //                 };
    //                 const createOrder = await insertOrderItem(dataItem);
    //                 const idUser = req.session.user.id;
    //                 const order = await getOrderByUser(idUser);
    //                 return res.render('products/carrito', {order, session: req.session});


    //             }
    //         } else{
    //             const data = {
    //                 idUser,
    //                 state: "Pending",
    //             };
    //             const createOrder = await insertOrder(data);
    //             if(createOrder){
    //                 let dataItem = {
    //                     idOrder: createOrder.idOrder,
    //                     idProduct,
    //                     quantity,
    //                 };
    //                 const createOrderItem = await insertOrderItem(dataItem);
    //                 const idUser = req.session.user.id;
    //                 const order = await getOderByUser(idUser);
    //                 return res.render("products/carrito", {order, session: req.session});

    //             }
    //             return res.status(400).json(`El usuario con el ID: ${idUser} no tiene ordenes`)
    //         } 
    //     } catch (error) {
    //         return res.status(500).json({ Error: `Error del servidor ${error}`})
    //     }
    // },
    
    
    // let userId = req.session.user.id;
    // Order.findOne({
    //   where: {
    //     userId: userId
    //   },
    //   include: [{association: "orderItems", include: [{association: "product", include: [{association: "images"}]}]}]
    // })
    //   .then((order) => {
    //     let products = order?.orderItems.map((item) => {
    //       return {
    //         product: item.product,
    //         quantity: item.quantity,
    //         id: item.id
    //       };
    //     });

    //     res.render("user/productCart", {
    //       session: req.session,
    //       order,
    //       products: products !== undefined ? products : [],
    //       user: req.session.user?.id || null,
    //     });
    //   })
    // .catch((error) => console.log(error));

}

