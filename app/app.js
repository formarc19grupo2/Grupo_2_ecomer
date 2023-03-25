const express = require('express');
const app = express();
const PORT = 3030;
const path = require('path');
const methodOverride =  require('method-override');
const session = require("express-session");
const cookieParser = require('cookie-parser');

/*template engines config */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/*Middlewares*/
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: "eComer",
  resave: false,
  saveUnitialized: true
}));
app.use(cookieParser());


/* Routers */
const indexRouter = require("./src/routes/index");
const productsRouter = require("./src/routes/products");
const usersRouter = require("./src/routes/user");
const footerRouter = require("./src/routes/footer");
const adminRouter = require("./src/routes/admin")

/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/institucional", footerRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));

/*
const logger = require('morgan');
const createError = require('http-errors');
app.use(logger('dev'));
*/

