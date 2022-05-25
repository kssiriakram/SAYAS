module.exports = (sequelize, Sequelize) => {
    const Focus_session = sequelize.define("focus_session", {
      success: {
        type: Sequelize.BOOLEAN
          },
      duration: {
        type: Sequelize.INTEGER
      },
      actual_duration: {
        type: Sequelize.INTEGER
      }
    });
  
    return Focus_session;
  };