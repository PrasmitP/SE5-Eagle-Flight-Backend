const db = require("../../models");
const StudentBadge = db.studentBadge;
const Student = db.student;
const User = db.user;
const Badge = db.badge;

exports.getAllStudentBadgesWithNames = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["fName", "lName"]
        }
      ]
    });

    const result = students.map(s => ({
      userId: s.userId,
      ocId: s.ocId,
      fName: s.user?.fName || "First",
      lName: s.user?.lName || "Last"
    }));

    res.send(result);
  } catch (err) {
    console.error("Error in getAllStudentBadgesWithNames:", err);
    res.status(500).send({
      message: err.message || "Error retrieving students with names."
    });
  }
};

exports.assignBadge = async (req, res) => {
  const { studentId, badgeId } = req.body;

  try {
    await StudentBadge.findOrCreate({ where: { studentId, badgeId } });
    res.status(200).json({ message: "Badge assigned." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign badge." });
  }
};

exports.revokeBadge = async (req, res) => {
  const { studentId, badgeId } = req.params;

  try {
    await StudentBadge.destroy({ where: { studentId, badgeId } });
    res.status(200).json({ message: "Badge removed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove badge." });
  }
};

exports.getBadgesByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({
      where: { ocId: studentId },
      include: [
        {
          model: Badge,
          as: "badge",
          through: { attributes: [] },
        },
      ],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.badge);
  } catch (err) {
    console.error("Error fetching student badges:", err);
    res.status(500).json({ error: "Failed to get student badges." });
  }
};

exports.getStudentByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const student = await db.student.findOne({ where: { userId } });
    if (!student) {
      return res.status(404).json({ message: 'Student not found for userId ' + userId });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error in getStudentByUserId:', err);
    res.status(500).json({ error: 'Failed to retrieve student.' });
  }
};