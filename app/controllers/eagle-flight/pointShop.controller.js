const db = require("../../models");
const Student = db.student;
const Redeemable = db.redeemable;
const StudentRedeemable = db.studentRedeemable;
const Op = db.Sequelize.Op;

// Redeem an item
exports.redeem = (req, res) => {
  const { studentUserId, redeemableId } = req.body;

  if (!studentUserId || !redeemableId) {
    return res.status(400).send({
      message: "Missing studentUserId or redeemableId",
    });
  }

  let response = {};

  Promise.all([
    Student.findByPk(studentUserId),
    Redeemable.findByPk(redeemableId)
  ])
    .then(([student, redeemable]) => {
      if (!student || !redeemable) {
        return res.status(404).send({
          message: "Student or Redeemable item not found",
        });
      }

      if (student.points < redeemable.points) {
        return res.status(400).send({
          message: "Insufficient points to redeem this item",
        });
      }

      // Subtract points from student
      student.points -= redeemable.points;
      return student.save().then(updatedStudent => {
        response.student = updatedStudent;

        // Create redemption record
        return StudentRedeemable.create({
          studentUserId,
          redeemableId,
          redeemDate: new Date()
        }).then(redemption => {
          response.redemption = redemption;
          res.status(201).send(response);
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error during redemption",
      });
    });
};

// Get all redeemable items
exports.findAllItems = (req, res) => {
  Redeemable.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving redeemable items",
      });
    });
};

// Get all redemptions for a student
exports.findRedemptionsByStudent = (req, res) => {
  const studentUserId = req.params.studentUserId;

  StudentRedeemable.findAll({
    where: { studentUserId },
    include: [
      {
        model: Redeemable,
        as: "redeemable",
      }
    ]
  })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving redemptions",
      });
    });
};

// Create a new redeemable item
exports.createItem = (req, res) => {
  const { name, description, points } = req.body;

  if (!name || points == null) {
    return res.status(400).send({
      message: "Name and points are required to create an item",
    });
  }

  Redeemable.create({
    name,
    description,
    points
  })
    .then(item => res.status(201).send(item))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating redeemable item",
      });
    });
};

// Delete a redeemable item
exports.deleteItem = (req, res) => {
  const id = req.params.id;

  Redeemable.destroy({
    where: { id }
  })
    .then(num => {
      if (num === 1) {
        res.send({ message: "Item was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete item with id=${id}. Maybe it was not found.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete item with id=" + id,
      });
    });
};