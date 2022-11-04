module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new Recipe
    router.post("/", upload.single('file'), recipes.create);
      
    // Retrieve all Recipes
    router.get("/", recipes.findAll);
  
    // Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);
  
    // Update a Recipe with id
   // router.put("/:id", recipes.update);
    router.put("/:id", upload.single('file'), recipes.update);
  
    // Delete a Recipe with id
    router.delete("/:id", recipes.delete);

    // Delete all Recipes
    router.delete("/", recipes.deleteAll);
  
    app.use("/api/recipes", router);

    // Logging the rejected field from multer error
/*app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field);
  });*/
  }