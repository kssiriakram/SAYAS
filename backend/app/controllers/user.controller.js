const db = require("../models");
const config = require("../../db/auth.config");

const User = db.users;

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//create a user

exports.create = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
   

    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.lastname_name,
        dailyGoalId: req.body.dailyGoalId,


    };

    User.create(user).then((data) => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurend while creating the user."
            });
        });
};
// find all users
exports.findAll = (req,res) =>{
    if(req.body.hasOwnProperty("email")){
    const email= req.body.email;
    var condition = {email: email };
    }else{
        var condition=null;
    

    User.findAll({where: condition})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "Some error occcured wwhile retrieving users."
        });
    });
};
}
//find user by email

exports.findOne = (req, res) => {
    const email = req.body.email;

    User.findOne({
        where: {
            email: email
        }
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
                  
              
              
             return res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,

            });

        })
        .catch(err => {
            res.status(500).send({
                message: "Error retriveing user with email=" + email
            });
        });
};
//update a user
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {


                res.send({
                    message: "Users was updated successfully."
                });

            } else {
                res.send({
                    message: `Cannot update user with id=${id}.Maybe user was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });

};
//delete a user by id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successful!!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}.maybe User isn't available`

                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

};
//delete all users
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} users were deleted successfully` });
        })
        .catch(err => {
            res.status(500).send({
                err: message || "Some error occured while deleting all users"
            })
        })
}

