module.exports = app =>{
    const Quits = require("../controllers/quit.controllers");
    //Construct routes
    var router = require("express").Router();
    //Create a quit_forms

    router.post("/",Quits.create);

    //Retrieve all quit_form
    router.get('/',Quits.findAll);

  


    // Update a quit_form with id
     router.put("/:id", Quits.update);


    //Retrieve a single quit_form with id 
    router.get("/:id",Quits.findOne);

    //Delete all quit_forms 
    router.delete("/",Quits.deleteAll);

    //Delete a quit_form with id 
    router.delete("/:id",Quits.delete);

    app.use('/api/quit',router);
};