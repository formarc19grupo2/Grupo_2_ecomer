const express = require("express");
const app = express();
const PORT = 3030;
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");
const cors = require('cors');


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
const productRoutermvc = require("./routes/product");
const userRoutermvc = require("./routes/user");
const adminRouter = require("./routes/admin");

const [ 
  userRouter, 
  productRouter, 
  orderRouter, 
  categoryRouter
] = require("./routes/api");


app.use(cors({
    origin: 'http://localhost:3000',
     // Define o domínio permitido
    
  }));

/* LLamado de rutas de la api porductos */
//const apiProducts = require("./routes/api/products")



/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", productRoutermvc);
app.use("/users", userRoutermvc);
app.use("/admin", adminRouter);

/* LLamado de rutas de la api porductos */
//const apiProducts = require("./routes/api/products")

/* llamado de rutas para usuarios */ 

//const userRoutes = require("./routes/api/users"); 

app.use(`/api/users`, userRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/orders`, orderRouter);
app.use(`/api/categories`, categoryRouter);

/* coleccion apis */
//app.use('/api/products', apiProducts);

/* coleccion apis */
//app.use('/api/products', apiProducts);

/* rutas de api a uruarios*/

//app.use(userRouter);


app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));