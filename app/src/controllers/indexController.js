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
        return res.render("legales",{session: req.session,})
    },
    history:(req,res)=>{
        return res.render("historia",{session: req.session})
    },
    contact:(req, res) =>{
        return res.render("contactos",{session: req.session,})
    },
}