module.exports = (sequelize, Sequelize) => {
    const Quit = sequelize.define("quit", {
      reason: {
        type: Sequelize.STRING
      }
    });
  
    return Quit;
  };