const db = require("../models");
const Task = db.tasks;

const Op = db.Sequelize.Op;

exports.create=(req,res) => {
  if(!req.body.desc) {
      res.status(400).send({
          message:"Content can not be empty!"
      });
      return;
  }  
  //Create a Task

  const task = {
      desc: req.body.desc,
      done : req.body.hasOwnProperty("done") ? req.body.done : false,
      userId: req.body.userId

  };
 
  Task.create(task).then((data)=>{
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
          err.message  || "Some error occurend while creating the task."
      });
  });
};

//find all tasks
exports.findAll = (req,res) =>{
    if(req.body.hasOwnProperty("userId")){
     const userId=req.body.userId;
    if(req.body.hasOwnProperty("done")){
    const done= req.body.done;
    var condition = {[Op.and]: [{done: done},{userId:userId}]};
    }else{
        var condition={userId:userId};
    }
}else{
    res.status(400).send({
        message:"no userId is specified!"
    });
    return;
}

    Task.findAll({where: condition})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Some error occcured wwhile retrieving tasks"
        });
    });
};
//find a task with id
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Task.findByPk(id)
    .then(data => {
        if(data){
            res.send(data);
        } 
        else{
            res.status(404).send({
             message:`Error retrieving tasks with id=${id}`  
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error retriveing tasks with id="+id
        });
    });
};
//update a task by id
exports.update= (req,res) => {
    const id =req.params.id;
    Task.update(req.body,{
        where :{id:id}
    })
    .then(num => {
        if(num == 1) {

            res.send({
                message:"Task was updated successfully."
            });

        }else{
            res.send({
                message: `Cannot update Task with id=${id}.Maybe task was not found or req.body is empty!`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating Task with id="+id
        });
    });

};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Task.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1 )
        {
            res.send({
                message: "Task was deleted successful!!"
            });
        }else{
            res.send({
                message:`Cannot delete Task with id=${id}.maybe Task isn't available`

            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Could not delete Task with id="+id
        });
    });

};

exports.deleteAll = (req,res) => {
    Task.destroy({
        where : {},
        truncate: false
    })
    .then(nums => {
        res.send({message : `${nums} Task were deleted successfully`});
    })
    .catch(err=>{
        res.status(500).send({
            err:message || "Some error occured while deleting all Task"
        })
    })
}

exports.findAllPending= (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  if(req.body.hasOwnProperty("userId")){
      const userId= req.body.userId;
  

  Task.findAndCountAll({ where: { [Op.and]: [{done: false},{userId:userId}] }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });
  }
else{
    res.status(400).send({
        message:"no userId is specified!"
    });
    return;
}
};

// getpagination function
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

//getpagingdata function 

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: task } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, task , totalPages, currentPage };
  };
