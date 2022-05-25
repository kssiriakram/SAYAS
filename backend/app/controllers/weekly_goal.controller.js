const db = require("../models");
const Weekly_goal = db.weekly_goals;

const Op = db.Sequelize.Op;

exports.create=(req,res) => {
  if(!req.body.hours) {
      res.status(400).send({
          message:"Content can not be empty!"
      });
      return;
  }  
  //Create a Weekly_goal

  const weekly_goal = {
      hours: req.body.hours,
      hours_done: req.body.hasOwnProperty("hours_done") ? req.body.hours_done : 0,
      success: req.body.hours_done===req.body.hours ? true : false
  };

  Weekly_goal.create(weekly_goal).then((data)=>{
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
          err.message  || "Some error occurend while creating the Weekly_goal."
      });
  });
};
//find all weekly_goals

exports.findAll = (req,res) =>{
    if(req.body.hasOwnProperty("success")){
    const success= req.body.success;
    var condition = {success: success};
    }else{
        var condition=null;
    }

    Weekly_goal.findAll({where: condition})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Some error occcured while retrieving Weekly_goals."
        });
    });
};

//find weekly_goal by id 
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Weekly_goal.findByPk(id)
    .then(data => {
        if(data){
            res.send(data);
        } 
        else{
            res.status(404).send({
             message:`Error retrieving Weekly_goal with id=${id}`  
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Error retriveing Weekly_goal with id="+id
        });
    });
};
//update weekly_goal by id
exports.update= (req,res) => {
    const id =req.params.id;
    Weekly_goal.update(req.body,{
        where :{id:id}
    })
    .then(num => {
        if(num == 1) {
            
            Weekly_goal.findByPk(id)
            .then(data => {
               const success= data.hours_done===data.hours ? true : false;
               Weekly_goal.update({"success": success},{
                where :{id:id}
               })
            });
               


            res.send({
                message:"Weekly_goal was updated successfully."
            });

        }else{
            res.send({
                message: `Cannot update Weekly_goal with id=${id}.Maybe Weekly_goal was not found or req.body is empty!`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating Weekly_goal with id="+id
        });
    });

};
//delete a weekly_goal by id
exports.delete = (req,res) =>{
    const id = req.params.id;

    Weekly_goal.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1 )
        {
            res.send({
                message: "Weekly_goal was deleted successful!!"
            });
        }else{
            res.send({
                message:`Cannot delete Weekly_goal with id=${id}.maybe Weekly_goal isn't available`

            });
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Could not delete weekly_goal with id="+id
        });
    });

};
//delete all weekly_goals
exports.deleteAll = (req,res) => {
    Weekly_goal.destroy({
        where : {},
        truncate: false
    })
    .then(nums => {
        res.send({message : `${nums} weekly_goals were deleted successfully`});
    })
    .catch(err=>{
        res.status(500).send({
            err:message || "Some error occured while deleting all weekly_goals"
        })
    })
}

exports.findAllSuccess= (req, res) => {
    Weekly_goal.findAll({ where: { success: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving successed weekly_goals."
        });
      });
  };

  exports.findAllPending= (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Weekly_goal.findAndCountAll({ where: { success: false }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weekly_goals."
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
    const { count: totalItems, rows: weekly_goal } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, weekly_goal , totalPages, currentPage };
  };