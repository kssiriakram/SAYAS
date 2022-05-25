module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
      desc: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Task;
  };