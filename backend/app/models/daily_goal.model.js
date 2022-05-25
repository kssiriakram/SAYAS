module.exports = (sequelize, Sequelize) => {
    const Daily_goal = sequelize.define("daily_goal", {
      minute: {
        type: Sequelize.INTEGER
      },
      success: {
        type: Sequelize.BOOLEAN
      },
      minutes_done: {
        type: Sequelize.INTEGER
      }
    });
  
    return Daily_goal;
  };