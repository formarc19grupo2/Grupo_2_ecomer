const express = require("express");
const app = express();
const PORT = 3030;
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");
const cors = require("cors");
require("dotenv").config();


/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* Middlewares */
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "ecommer",
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(cookieCheck);

/* Routers */
const indexRouter = require("./routes");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

/* LLamado de rutas de la api porductos */
const apiProducts = require("./routes/api/products")

/* llamado de rutas para usuarios */ 

const userRoutes = require("./routes/api/users"); 



/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use(cors());

/* coleccion apis */
app.use('/api/products', apiProducts);

/* rutas de api a uruarios*/

app.use(userRoutes);



app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));