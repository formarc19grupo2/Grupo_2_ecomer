const express = require('express');
const app = express();

const path = require('path')

app.use(express.static('public'));

/* Routers */
const indexRouter = require("./src/routes");

/* Routes Middlewares */
app.use("/", indexRouter);

app.listen(3030, () => {
  console.log("server online on localhost:3030");
});
