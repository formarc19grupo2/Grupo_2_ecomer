const express = require('express');
const app = express();

const path = require('path');

app.use(express.static('public'));
app.set ("view engine", "ejs");
app.set('views', path.join(__dirname, './src/views')); 

/* Routers */
const indexRouter = require("./src/routes");

/* Routes Middlewares */
app.use("/", indexRouter);

app.listen(3030, () => {
  console.log("server online on http://localhost:3030/");
});
