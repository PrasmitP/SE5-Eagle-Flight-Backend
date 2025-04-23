const db = require("../../models");
const Student = db.student;
const Op = db.Sequelize.Op;
const user = require("./user.controller.js");

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
    enrollmentSemester: req.body.enrollmentSemester,
    graduationYear: req.body.graduationYear,
    graduationSemester: req.body.graduationSemester,
    ocId: req.body.ocId,
    points: 0,
    majorId: req.body.majorId,
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

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  Student.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single Student with an ocId
exports.findOne = (req, res) => {
  const ocId = req.params.ocId;
  Student.findOne({ where: { ocId: ocId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with ocId=${ocId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single Student with an ocId
exports.findOneForUserId = (req, res) => {
  const userId = req.params.userId;
  Student.findOne({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with userId=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with userId=" + userId,
      });
    });
};

exports.findStudentsByName = (req, res) => {
  user.findStudentByName;
};

// Update a Student by the ocId in the request
exports.update = (req, res) => {
  const ocId = req.params.ocId;
  Student.update(req.body, {
    where: { ocId: ocId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with ocId=${ocId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Student with ocId=" + ocId,
      });
    });
};

// Add points to a Student by the userId in the request
exports.updatePoints = async (req, res) => {
  const userId = req.params.userId;
  const points = parseInt(req.body.points, 10);

  if (isNaN(points)) {
    return res.status(400).send({
      message: "Points must be a valid integer.",
    });
  }

  try {
    const student = await Student.findOne({ where: { userId } });

    if (!student) {
      return res.status(404).send({
        message: "Student not found.",
      });
    }

    const newPoints = student.points + points;

    await student.update({ points: newPoints });

    res.send({
      message: "Student points updated successfully.",
      points: newPoints,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating student points.",
    });
  }
};
