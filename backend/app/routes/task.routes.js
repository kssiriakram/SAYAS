module.exports = app =>{
    const Task = require("../controllers/task.controller");
    //Construct routes
    var router = require("express").Router();
    //Create a Task

    router.post("/",Task.create);

    //Retrieve all Tasks
   router.get("/",Task.findAll);

    // Update a Task with id
     router.put("/:id", Task.update);
    
    //Retrieve pending Tasks
    router.get("/Pagination",Task.findAllPending);

    //Retrieve a single Task with id 
    router.get("/:id",Task.findOne);

    //Delete all tasks
    router.delete("/",Task.deleteAll);

    //Delete a Task with id 
    router.delete("/:id",Task.delete);

    app.use('/api/task',router);
};