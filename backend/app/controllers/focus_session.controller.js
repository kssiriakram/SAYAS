
const db = require("../models");
const Focus_session = db.focus_sessions;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {


    const focus_session = {
        duration: req.body.duration,
        actual_duration: 0,
        success: false,
        userId: req.body.userId,
        quitId: req.body.quitId

    };
    Focus_session.create(focus_session).then((data) => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurend while creating the focus_session."
            });
        });
};

exports.findAll = (req, res) => {
    if(req.body.hasOwnProperty("userId")){
        const userId= req.body.userId;
    if (req.body.hasOwnProperty("success")) {
        const success = req.body.success;
        var condition = { [Op.and]: [{userId : userId},{success: success}]   };
    } else {
        var condition = {userId : userId };
    }
}else{
    res.status(400).send({
        message:"no userId is specified!"
    });
    return;
}

    Focus_session.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occcured wwhile retrieving focus_sessions."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Focus_session.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            }
            else {
                res.status(404).send({
                    message: `Error retrieving focus_session with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retriveing focus_session with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Focus_session.update(req.body, {
        where: { id: id }
    })
        .then(num => {


            Focus_session.findByPk(id)
                .then(data => {
                    const started = new Date(data.createdAt).getTime();
                    const success = data.updatedAt >= new Date(started + data.duration * 60 * 1000) ? true : false;
                    Focus_session.update({ "success": success }, {
                        where: { id: id }
                    });
                });



            res.send({
                message: "Focus_session was updated successfully."
            });


        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Focus_session with id=" + id
            });
        });

};

exports.delete = (req, res) => {
    const id = req.params.id;

    Focus_session.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Focus_session was deleted successful!!"
                });
            } else {
                res.send({
                    message: `Cannot delete Focus_session with id=${id}.maybe Focus_session isn't available`

                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Focus_session with id=" + id
            });
        });

};

exports.deleteAll = (req, res) => {
    Focus_session.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Focus_session were deleted successfully` });
        })
        .catch(err => {
            res.status(500).send({
                err: message || "Some error occured while deleting all Focus_session"
            })
        })
}

