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

//METODO DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Buscar el índice del elemento con el ID especificado
  const index = dishes.findIndex((dish) => dish.id == id);

  if (index != -1) {
    // Eliminar el elemento del array
    dishes.splice(index, 1);

    //GUARDAR JSON ACTUALIZADO
    fs.writeFile(
      "resources/dishes.json",
      JSON.stringify(dishes, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Error al escribir en el archivo JSON:", err);
          res.status(500).send("Error interno del servidor");
          return;
        }
        console.log("Datos guardados correctamente <3");
        res.status(200);
      }
    );

    res
      .status(200)
      .json({ mensaje: `Plato con ID ${id} eliminado correctamente` })
      .redirect("/");
  } else {
    // Si el elemento no se encontró, responder con un mensaje de error
    res.status(404).json({ mensaje: `Elemento con ID ${id} no encontrado` });
  }
});

//METODO POST
router.post("/", (req, res) => {
  //SE OBTIENE EL PLATO
  const newDish = req.body;

  //LEER EL JSON
  fs.readFile("resources/dishes.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo JSON:", err);
      res.status(500).send("Error interno del servidor");
      return;
    }

    if (data) {
      dishes = JSON.parse(data);
    }

    //AGREGA EL NUEVO PLATO
    const index = dishes.findIndex((dish) => dish.id == newDish.id);

    if (index == -1) {
      dishes.push(newDish);
    } else {
      console.log("Ingrese otra Id. Id de plato existente");
    }

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
