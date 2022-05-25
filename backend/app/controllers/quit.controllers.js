const db = require("../models");
const Quit= db.quits;

const Op = db.Sequelize.Op;

exports.create=(req,res) => {
  if(!req.body.reason) {
      res.status(400).send({
          message:"Content can not be empty!"
      });
      return;
  }  
  //Create a quit_form

  const quit = {
      reason: req.body.reason,

  };
 
  Quit.create(quit).then((data)=>{
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
          err.message  || "Some error occurend while creating the quit."
      });
  });
};
//get all quits
exports.findAll = (req,res) =>{

    Quit.findAll()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Some error occcured wwhile retrieving quits"
        });
    });
};
//get single quit by id
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Quit.findByPk(id)
    .then(data => {
        if(data){
            res.send(data);
        } 
        else{
            res.status(404).send({
             message:`Error retrieving quits with id=${id}`  
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error retriveing quits with id="+id
        });
    });
};
//update quit by id
exports.update= (req,res) => {
    const id =req.params.id;
    Quit.update(req.body,{
        where :{id:id}
    })
    .then(num => {
        if(num == 1) {
            
            res.send({
                message:"quit was updated successfully."
            });

        }else{
            res.send({
                message: `Cannot update quit with id=${id}.Maybe quit was not found or req.body is empty!`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating quit with id="+id
        });
    });

};
//delete a quit
exports.delete = (req,res) =>{
    const id = req.params.id;

    Quit.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1 )
        {
            res.send({
                message: "quit was deleted successful!!"
            });
        }else{
            res.send({
                message:`Cannot delete quit with id=${id}.maybe quit isn't available`

            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Could not delete quit with id="+id
        });
    });

};
//delete all quits
exports.deleteAll = (req,res) => {
    Quit.destroy({
        where : {},
        truncate: false
    })
    .then(nums => {
        res.send({message : `${nums} quits were deleted successfully`});
    })
    .catch(err=>{
        res.status(500).send({
            err:message || "Some error occured while deleting all quit"
        })
    })
}

