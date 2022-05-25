const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("DROP and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sayas application." });
});

// set port, listen for requests
require("./app/routes/weekly_goal.routes")(app);
require("./app/routes/daily_goal.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/quit.routes")(app);
require("./app/routes/focus_session.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
