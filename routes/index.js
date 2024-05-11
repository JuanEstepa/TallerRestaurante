const router = require("express").Router();
const fs = require("fs");

//const dishes = {};
let dishes;

//SE UTILIZA LA FUNCION FS DE NODE PARA LEER UN JSON
fs.readFile("resources/dishes.json", (err, data) => {
  if (!err) {
    console.log("Platos leidos correcatamente");

    //SE ALMACENA EL JSON PARSEADO EN LA VARIABLE DISHES
    dishes = JSON.parse(data);
  }
});

//CONSULTA DE TODOS LOS PLATOS QUE ESTAN EN EL MENÚ
router.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Taller #1",

    //SE ENVIA EL JSON EN UNA VARIABLE DISHES
    dishes: dishes,
  });
});

module.exports = router;
