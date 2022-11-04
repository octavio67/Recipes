const db = require("../models");
const Recipe = db.recipes;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.category) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // Create a Recipe
  const recipe = {
    name: req.body.name,
    category: req.body.category,
    filename: req.file ? req.file.filename : "",
  };

  // Save Recipe in the database
  Recipe.create(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the recipe",
      });
    });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  Recipe.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Recipes",
      });
    });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encuentra la receta con id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al recuperar Receta con id=" + id,
      });
    });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const recipe = {
    name: req.body.name,
    category: req.body.category,
    filename: req.file ? req.file.filename : "",
  };

  Recipe.update(recipe, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Receta con id=${id} actualizada correctamente.`,
        });
      } else {
        res.send({
          message: `No se puede actualizar Receta con id=${id}. Tal vez no se encontró Receta o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error actualizando Receta con id=" + id,
      });
    });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Receta con id=${id} borrada correctamente`,
        });
      } else {
        res.send({
          message: `No se puede borrar Receta con id=${id}. Tal vez la Receta no fue encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo borrar Receta con id=" + id,
      });
    });
};

// Deleta all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Todos las Recetas fueron borradas correctamentes`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al borrar todos las Recetas",
      });
    });
};
