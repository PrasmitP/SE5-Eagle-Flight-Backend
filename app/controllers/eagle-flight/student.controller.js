const db = require("../../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = (req, res) => {
  console.log("trying to create student")
  console.log(req.body)
  // Validate request
  if (!req.body.ocId) {
    res.status(400).send({
      message: "Student needs an OC ID!",
    });
    return;
  }

  // Create a Student
  const student = {
    userId: req.body.userId,
    enrollmentYear: req.body.enrollmentYear,
    ocId: req.body.ocId,
    points: 0
  };

  // Trying to save User in the database
  Student.create(student)
    .then(student => res.send(student))
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Some error occurred while creating the Student.",
      });
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

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

// Find a single User with a First Name + " " + Last Name
exports.findByName = (req, res) => {
  const name = req.params.name;
  if (!name) {
    return res.status(400).send("Name parameter is required.");
  }
  const fName = name.split(" ")[0];
  const lName = name.split(" ")[1];
  console.log(`------------------------getting user with name: ${fName} + ${lName}`);
  User.findOne({
    where: {
      fName: fName,
      lName: lName
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
