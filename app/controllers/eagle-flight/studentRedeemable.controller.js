const db = require("../../models");
const StudentRedeemable = db.studentRedeemable;
const Student = db.student;
const Redeemable = db.redeemable;

// Create and Save a new StudentRedeemable
exports.create = async (req, res) => {
  const { studentUserId, redeemableId } = req.body;

  if (!studentUserId || !redeemableId) {
    return res.status(400).send({
      message: "Both studentUserId and redeemableId are required.",
    });
  }

  try {
    const student = await Student.findByPk(studentUserId);
    const redeemable = await Redeemable.findByPk(redeemableId);

    if (!student || !redeemable) {
      return res.status(404).send({ message: "Student or Redeemable not found." });
    }

    if (student.points < redeemable.points) {
      return res.status(400).send({
        message: "Student does not have enough points to redeem this item.",
      });
    }

    // Deduct points and save redemption
    student.points -= redeemable.points;
    await student.save();

    const studentRedeemable = await StudentRedeemable.create({
      studentUserId,
      redeemableId,
      redeemDate: new Date(),
    });

    res.status(201).send(studentRedeemable);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error redeeming the item.",
    });
  }
};

// Retrieve all StudentRedeemables
exports.findAll = (req, res) => {
  StudentRedeemable.findAll()
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({ message: err.message || "Error retrieving data." })
    );
};

// Get all items a student has redeemed
exports.findByStudent = (req, res) => {
  const studentUserId = req.params.studentUserId;

  StudentRedeemable.findAll({ where: { studentUserId } })
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: "Error retrieving redeemed items for student=" + studentUserId,
      })
    );
};

// Get all students who redeemed a specific reward
exports.findByRedeemable = (req, res) => {
  const redeemableId = req.params.redeemableId;

  StudentRedeemable.findAll({ where: { redeemableId } })
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: "Error retrieving students for redeemable=" + redeemableId,
      })
    );
};