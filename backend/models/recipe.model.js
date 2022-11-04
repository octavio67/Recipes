module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define(
      "recipe", 
      {
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      filename: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
    );
  
    return Recipe;
  };
  