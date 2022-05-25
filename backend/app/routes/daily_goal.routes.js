module.exports = app =>{
    const Daily_goals = require("../controllers/daily_goal.controller");
    //Construct routes
    var router = require("express").Router();
    //Create a daily_goal

    router.post("/",Daily_goals.create);

    //Retrieve all daily_goals
    router.get("/",Daily_goals.findAll);

    //Retrieve pending daily_goals
    router.get("/Pagination",Daily_goals.findAllPending);


    // Update a daily_goal with id
     router.put("/:id", Daily_goals.update);


    //Retrieve a single daily_goal with id 
    router.get("/:id",Daily_goals.findOne);

    //Delete all daily_goals 
    router.delete("/",Daily_goals.deleteAll);

    //Delete a daily_goal with id 
    router.delete("/:id",Daily_goals.delete);

    app.use('/api/daily_goal',router);
};