const path = require("path");
const fs = require('fs');
const { users, writeUsersJson } = require("../database");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


const usersFilePath = path.join(__dirname,"../database/userDataBase.json");




module.exports = {

    

    detail: (req, res) => {
        let userId = req.params.id;
        let user = users.find(user => user.id == userId);

        res.render("users/userDetail", {
            user
        })
    },

    login: (req, res) => {
        res.render("users/login")
    },
    register: (req, res) => {
        res.render("users/register")
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let lastId = 0;

            users.forEach(user => {
             if(user.id > lastId) {
                 lastId = user.id;
             }
            });
     
            let newUser = {
             id: lastId + 1,
             name: req.body.name,
             last_name: req.body.last_name,
             email: req.body.email,
             pass: bcrypt.hashSync(req.body.pass1, 12),
             avatar: req.file ? req.file.filename : "default-image.png",
             rol: "USER",
             tel: "",
             address: "",
             postal_code: "",
             province: "",
             city: ""
            };
     
            users.push(newUser);
     
            writeUsersJson(users);
     
            res.send("Usuario creado")
        } else {
            res.render("users/register", {
                errors: errors.mapped(),
                old: req.body
            })
        }
      
    }
}