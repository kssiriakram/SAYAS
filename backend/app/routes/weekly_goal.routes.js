module.exports = app =>{
    const Weekly_goals = require("../controllers/weekly_goal.controller");
    //Construct routes
    var router = require("express").Router();
    //Create a weekly_goal

    router.post("/",Weekly_goals.create);

    //Retrieve all weekly_goals
    router.get("/",Weekly_goals.findAll);

    //Retrieve all weekly_goals
    router.get("/Pagination",Weekly_goals.findAllPending);

    //Retrieve all published weekly_goals
    router.get("/Success",Weekly_goals.findAllSuccess);

    // Update a weekly_goal with id
     router.put("/:id", Weekly_goals.update);


    //Retrieve a single weekly_goal with id 
    router.get("/:id",Weekly_goals.findOne);

    //Delete all weekly_goals
    router.delete("/",Weekly_goals.deleteAll);

    //Delete a weekly_goal with id 
    router.delete("/:id",Weekly_goals.delete);

    app.use('/api/weekly_goal',router);
};