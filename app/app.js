const express = require('express');
const app = express();
const methodOverride =  require('method-override');

const path = require('path');

app.use(express.static('public'));
app.set ("view engine", "ejs");
app.set('views', path.join(__dirname, './src/views'));
app.use(methodOverride('_method'));

/* Routers */
const indexRouter = require("./src/routes/index");
const productsRouter = require("./src/routes/products");

/* Routes Middlewares */
app.use("/", indexRouter);
app.use('/products', productsRouter);


app.listen(3030, () => {
  console.log("server online on localhost:3030");
});
