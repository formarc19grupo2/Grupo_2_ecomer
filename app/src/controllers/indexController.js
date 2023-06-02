const { carousel } = require("../old_database");
const { Product } = require("../database/models");

module.exports = {
    
    index: (req, res) => {
        Product.findAll({
            include: [{association: "images"}]
        })
        .then(products => {
            return res.render("index", {
                carousel,
                sliderTitle: "Productos en oferta",
                sliderProducts: products,
                session: req.session
            })
        })
        .catch(error => console.log(error));
    },

    leg:(req, res) =>{
        return res.render("footer/legales",{session: req.session,})
    },
    history:(req,res)=>{
        return res.render("footer/historia",{session: req.session})
    },
    contact:(req, res) =>{
        return res.render("footer/contactos",{session: req.session,})
    },
    tarjetas:(req, res) =>{
        return res.render("tarjetas",{session: req.session,})
    },
}