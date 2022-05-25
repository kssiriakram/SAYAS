module.exports = (sequelize, Sequelize) => {
    const Weekly_goal = sequelize.define("weekly_goal", {
      hours: {
        type: Sequelize.INTEGER
      },
      success: {
        type: Sequelize.BOOLEAN
      },
      hours_done: {
        type: Sequelize.INTEGER
      }
    });
  
    return Weekly_goal;
  };