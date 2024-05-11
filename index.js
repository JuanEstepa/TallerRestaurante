const express = require("express");

const app = express();

//SETTERS

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("PORT", process.env.PORT || 3000);

//MIDDLEWARE

//utiliza ra ruta raiz / para ejecutar el index
app.use("/", require("./routes/index"));

//ejecuta el puerto donde se utilizara el servidor
app.listen(app.get("PORT"), () =>
  console.log(`Server is listen at port: ${app.get("PORT")}`)
);
