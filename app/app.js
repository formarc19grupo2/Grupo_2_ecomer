const express = require('express');
const app = express();

const path = require('path')

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/home.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/login.html"));
});
app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/productCart.html"));
});
app.get("/productDetail", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/productDetail.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/register.html"));
});


app.listen(3030, () => {
  console.log("server online on localhost:3030");
});
