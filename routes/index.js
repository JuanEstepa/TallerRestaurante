const router = require("express").Router();
const fs = require("fs");

//const dishes = {};
let dishes;

fs.readFile("resources/dishes.json", (err, data) => {
  if (!err) {
    console.log("Platos leidos correcatamente");
    dishes = JSON.parse(data);
  }
});

router.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Taller #1",
    dishes: dishes,
  });
});

module.exports = router;
