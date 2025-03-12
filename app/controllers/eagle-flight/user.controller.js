const db = require("../../models");
const User = db.user;
const Student = db.student;
const student = require("./student.controller.js");
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  console.log("trying to create user")
  console.log(req.body)
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "User needs a First Name!",
    });
    return;
  }

  // Create a User
  const user = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    roleId: req.body.roleId,
  };
  let response = {};
  // Trying to save User in the database
  User.create(user)
    .then(async userInstance => {
      response.user = userInstance;

      if (user.roleId == 1 && !req.body.ocId) {
        res.status(400).send({
          message: "Student needs an OC ID!",
        });
        return;
      }

      //roleId 1 is student
      if (user.roleId == 1) {
        user.userId = userInstance.id;
        user.enrollmentYear = req.body.enrollmentYear || null;
        user.enrollmentSemester = req.body.enrollmentSemester || null;
        user.graduationYear = req.body.graduationYear || null;
        user.graduationSemester = req.body.graduationSemester || null;
        user.ocId = req.body.ocId || null;
        const student = {
          userId: user.userId,
          enrollmentYear: user.enrollmentYear,
          enrollmentSemester: user.enrollmentSemester,
          graduationYear: user.graduationYear,
          graduationSemester: user.graduationSemester,
          ocId: user.ocId,

          points: 0
        }
        Student.create(student).then(studentInstance => {
          response.student = studentInstance;
          res.status(201).send(response);
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Student.",
          });
        });
      } else {
        res.status(201).send(response);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User. Perhaps the role does not exist.",
      }
      );
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(`------------------------getting user with id: ${id}`);
  let response = {};
  User.findByPk(id)
    .then((data) => {
      if (data) {
        response.user = data;
        if (data.roleId == 1) {
          Student.findByPk(id).then(data => {
            response.student = data
            res.status(200).send(response);
          }).catch(err => res.status(500).send(err.message));
        } else {
          res.status(200).send(response);
        }

      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find all Students with a First Name + " " + Last Name
exports.findStudentsByName = (req, res) => {
  const name = req.params.name;
  if (!name) {
    return res.status(400).send("Name parameter is required.");
  }
  const fName = name.split(" ")[0];
  const lName = name.split(" ")[1];
  console.log(`------------------------getting user with name: ${fName} + ${lName}`);
  User.findAll({
    where: {
      fName: fName,
      lName: lName,
      roleId: 1 // role id for students!!
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send(`${name} not found`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with name=" + name,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  let roleId;
  req.body.roleId ? roleId = req.body.roleId : roleId = null;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
