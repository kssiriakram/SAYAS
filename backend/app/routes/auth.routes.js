const { verifySignUp } = require("../middlewares");
const User = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/Register",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
        ],
        User.create
    );

    app.post("/api/auth/Login", User.findOne);

    // app.post("/api/auth/signout", controller.signout);
};