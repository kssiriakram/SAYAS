const dbConfig = require("../../db/config");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
host: dbConfig.HOST,
dialect:dbConfig.dialect,
operatorsAliases:false,

pool: {
    max: dbConfig.pool.max,
    min:dbConfig.pool.min,
    acquire:dbConfig.pool.acquire,
    idle:dbConfig.pool.idle
}
});

const db = {};

db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.daily_goals = require("./daily_goal.model")(sequelize,Sequelize);
db.weekly_goals = require("./weekly_goal.model")(sequelize,Sequelize);
db.users = require("./user.model")(sequelize,Sequelize);
db.tasks = require("./task.model")(sequelize,Sequelize);
db.focus_sessions = require("./focus_session.model")(sequelize,Sequelize);
db.quits = require("./quit.model")(sequelize,Sequelize);

db.weekly_goals.hasMany(db.daily_goals, { as: "daily_goals" });
db.daily_goals.belongsTo(db.weekly_goals, {
  foreignKey: "weeklyGoalId",
  as: "weekly_goal",
});

db.daily_goals.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.daily_goals, {
  foreignKey: "dailyGoalId",
  as: "daily_goal",
});

db.users.hasMany(db.tasks, { as: "tasks" });
db.tasks.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.focus_sessions, { as: "focus_sessions" });
db.focus_sessions.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.quits.hasMany(db.focus_sessions, { as: "focus_sessions" });
db.focus_sessions.belongsTo(db.quits, {
  foreignKey: "quitId",
  as: "quit",
});

module.exports=db;