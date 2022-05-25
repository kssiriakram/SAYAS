const db = require("../models");
const Daily_goal = db.daily_goals;

const Op = db.Sequelize.Op;

exports.create=(req,res) => {
  if(!req.body.minute) {
      res.status(400).send({
          message:"Content can not be empty!"
      });
      return;
  }  
  //Create a Daily_goal

  const daily_goal = {
      minute: req.body.minute,
      minutes_done: req.body.hasOwnProperty("minutes_done") ? req.body.minutes_done :0 ,
      success: req.body.minute===req.body.minute_done ? true : false,
      weeklyGoalId: req.body.weeklyGoalId

  };

  Daily_goal.create(daily_goal).then((data)=>{
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
          err.message  || "Some error occurend while creating the Daily_goal."
      });
  });
};

//find daily_goals

exports.findAll = (req,res) =>{
    if(req.body.hasOwnProperty("success")){
    const success= req.body.success;
    var condition = {success: success};
    }else{
        var condition=null;
    }

    Daily_goal.findAll({where: condition})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Some error occcured wwhile retrieving Daily_goals."
        });
    });
};

//find a daily_goal by id


exports.findOne = (req,res) =>{
    const id = req.params.id;

    Daily_goal.findByPk(id)
    .then(data => {
        if(data){
            res.send(data);
        } 
        else{
            res.status(404).send({
             message:`Error retrieving daily_goal with id=${id}`  
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error retriveing daily_goal with id="+id
        });
    });
};

//update a daily_goal

exports.update= (req,res) => {
    const id =req.params.id;
    Daily_goal.update(req.body,{
        where :{id:id}
    })
    .then(num => {
        if(num == 1) {
            
            Daily_goal.findByPk(id)
            .then(data => {
               const success= data.minutes_done===data.minute ? true : false;
               Daily_goal.update({"success": success},{
                where :{id:id}
               })
            });
               


            res.send({
                message:"Daily_goal was updated successfully."
            });

        }else{
            res.send({
                message: `Cannot update Daily_goal with id=${id}.Maybe Daily_goal was not found or req.body is empty!`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating Daily_goal with id="+id
        });
    });

};

//delete a daily_goal by id

exports.delete = (req,res) =>{
    const id = req.params.id;

    Daily_goal.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1 )
        {
            res.send({
                message: "Daily_goal was deleted successful!!"
            });
        }else{
            res.send({
                message:`Cannot delete Daily_goal with id=${id}.maybe Daily_goal isn't available`

            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Could not delete Daily_goal with id="+id
        });
    });

};

//delete all daily_goal

exports.deleteAll = (req,res) => {
    Daily_goal.destroy({
        where : {},
        truncate: false
    })
    .then(nums => {
        res.send({message : `${nums} Daily_goals were deleted successfully`});
    })
    .catch(err=>{
        res.status(500).send({
            err:message || "Some error occured while deleting all Daily_goals"
        })
    })
}

//find pending daily_goal

  exports.findAllPending= (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Daily_goal.findAndCountAll({ where: { success: false }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving daily_goals."
      });
    });
};

// getpagination function
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

//getpagingdata function 

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: daily_goals } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, daily_goals , totalPages, currentPage };
  };
