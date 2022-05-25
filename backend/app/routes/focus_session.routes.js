module.exports = app =>{
    const Focus_session = require("../controllers/focus_session.controller");
    //Construct routes
    var router = require("express").Router();
    //Create a Focus_session

    router.post("/",Focus_session.create);

    //Retrieve all Focus_sessions
    router.get("/",Focus_session.findAll);



    // Update a Focus_session with id
     router.put("/:id", Focus_session.update);


    //Retrieve a single Focus_session with id 
    router.get("/:id",Focus_session.findOne);

    //Delete all Focus_sessions 
    router.delete("/",Focus_session.deleteAll);

    //Delete a Focus_session with id 
    router.delete("/:id",Focus_session.delete);

    app.use('/api/focus_session',router);
};