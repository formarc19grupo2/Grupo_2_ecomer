const path = require("path")

module.exports = {
    
    index: (req, res) => {
        return res.sendFile(path.join(__dirname,"../view/home.html"))
    },
    detail: (req, res) => {
        return res.sendFile(path.join(__dirname,"../view/productDetail.html"))
    },
    cart: (req,res)=>{
        return res.sendFile(path.join(__dirname, "../view/productCart.html"))
    },
    login: (req,res)=>{
        return res.sendFile(path.join(__dirname, "../view/login.html"))
    },
    register: (req,res)=>{
        return res.sendFile(path.join(__dirname, "../view/register.html"))
    },
}