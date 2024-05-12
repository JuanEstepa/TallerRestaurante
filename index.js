const express = require("express");
const path = require("path");

const app = express();

//SETTERS
app.use(express.static("public"));
app.use(express.json());
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("PORT", process.env.PORT || 3000);

//MIDDLEWARE

//utiliza la ruta raiz / para ejecutar el index
app.use("/", require("./routes/index"));

//ejecuta el puerto donde se utilizara el servidor
app.listen(app.get("PORT"), () =>
  console.log(`Server is listen at port: ${app.get("PORT")}`)
);
