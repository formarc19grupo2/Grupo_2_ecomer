//const { users, writeUsersJson } = require("../old_database");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

const fs = require('fs');



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
                tel,
                address,
                postal_code,
                province,
                city
            } = req.body;
        User.update({
            name,
            last_name,
            tel,
            address,
            postal_code,
            province,
            city,
            avatar: req.file ? req.file.filename : User.avatar
        }, {
            where: {
                id: userId
            }
        })
        

            // delete user.pass;

           // req.session.user = user;

            return res.redirect("/users/profile");
        } else {
            const userInSessionId = req.session.user.id;
            const userInSession = User.findByPk(user => user.id === userInSessionId);

            return res.render("user/userProfileEdit", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
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
        return res.render("user/productCart")
      },
    
    }

