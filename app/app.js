
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const express = require('express');
const app = express();
const methodOverride =  require('method-override');

const path = require('path');

app.use(express.static('public'));
app.set ("view engine", "ejs");


app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, './src/views'));
app.use(methodOverride('_method'));

/* Routers */
const indexRouter = require("./src/routes/index");
const productsRouter = require("./src/routes/products");
const footerRouter = require("./src/routes/footer");

/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/institucional", footerRouter);


app.listen(3030, () => {
  console.log("server online on http://localhost:3030/");
});
