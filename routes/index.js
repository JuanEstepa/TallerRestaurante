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

//RENDER DE UN FORMULARIO PARA ADD
router.get("/add", (req, res) => {
  res.render("add.ejs", {
    title: "Agregar plato",
    dishes: dishes,
  });
});

//METODO POST
router.post("/", (req, res) => {
  //SE OBTIENE EL PLATO
  const newDish = req.body;
  console.log(`error: ${newDish}`);

  //LEER EL JSON
  fs.readFile("resources/dishes.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo JSON:", err);
      res.status(500).send("Error interno del servidor");
      return;
    }
    let dishes = [];
    if (data) {
      dishes = JSON.parse(data);
    }

    //AGREGA EL NUEVO PLATO
    dishes.push(newDish);

    //GUARDAR JSON ACTUALIZADO
    fs.writeFile(
      "resources/dishes.json",
      JSON.stringify(dishes, null, 2),
      "utf-8",
      () => {
        if (err) {
          console.error("Error al escribir en el archivo JSON:", err);
          res.status(500).send("Error interno del servidor");
          return;
        }
        console.log("Datos guardados correctamente");
        res.status(200);
      }
    );
  });

  res.redirect("/");
});

module.exports = router;
