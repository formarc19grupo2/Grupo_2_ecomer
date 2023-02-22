const path = require("path");
const fs = require('fs');

const usersFilePath = path.join(__dirname,"../database/userDataBase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const writeJson = (users) => {
	fs.writeFileSync(usersFilePath, JSON.stringify(users), {encoding: "utf-8"})
}


module.exports = {

    allUsers: (req, res) => {
        return res.render("home",{
            users,
        })
    },

    detail: (req, res) => {
        let userId = req.params.id;
        let user = users.find(user => user.id == userId);

        res.render("user/userDetail", {
            user
        })
    },

   
    

    create: (req, res) => {
        return res.render("../users/register")
    },
    store: (req, res) =>{

       let lastId = users[users.length -1].id;
		

		let newUser = {
			id: lastId + 1,
			name: req.body.name,
			apellido: req.body.apellido,
			email: req.body.email,
			contrasena: req.body.contrasena,
			categoria: req.body.categoria,
			image: req.file.filename ,
		}
		users.push(newUser);
        console.log(newUser);

		writeJson(users); //escribe el JSON - y persiste 

		//res.send(newuser)
		res.redirect("/");
    },
    edit: (req, res) => {
        let userId = Number(req.params.id);

		let userToEdit = users.find(user => user.id === userId);

		return res.render("users/edit",{
            userToEdit,
        })
    },
    update: (req, res) => {
		let userId = Number(req.params.id);

        users.forEach(element => {
            if(element.id === userId){
                element.name = req.body.name;
                element.apellido = req.body.apellido;
                element.email = req.body.email;
                element.contrasena = req.body.contrasena;
                element.categoria = req.body.categoria;
            }
        });

		writeJson(users);

        res.redirect("/");
	},
    delete: (req, res)=>{
            let userId = Number(req.params.id);
    
            users.forEach(user => {
                if(user.id === userId){
                    let userToDestroy = users.indexOf(user)
                    users.splice(userToDestroy, 1);
                }
            });
            writeJson(users)
    
            res.send("user eliminado correctamente")
    }
}