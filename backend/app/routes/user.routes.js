module.exports = app =>{
    const { verifySignUp } = require("../middlewares");
    const User = require("../controllers/user.controller");
    //Construct routes
    var router = require("express").Router();
    //Create a user

    router.post("/register", [verifySignUp.checkDuplicateUsernameOrEmail],User.create);

    //Retrieve all users
    router.get("/",User.findAll);

    

    // Update a user with id
     router.put("/:id",User.update);


    //Retrieve a single user with id 
    router.post("/login",User.findOne);

    //Delete all users 
    router.delete("/",User.deleteAll);

    //Delete a user with id 
    router.delete("/:id",User.delete);

    app.use('/api/user',router);
};