const db = require("../../models");
const PlanInstance = db.planInstance;
const InstanceTask = db.instanceTask;
const Op = db.Sequelize.Op;

// Create and Save a new PlanInstance
exports.create = (req, res) => {
    // Validate request
    if (!req.body.studentUserId || !req.body.planId) {
        res.status(400).send({
            message: "PlanInstance needs a studentUserId and a planId!",
        });
        return;
    }
    // Create a PlanInstance
    const planInstance = {
        studentUserId: req.body.studentUserId,
        planId: req.body.planId,
    };

    console.log("Creating planInstance ");
    // Trying to save PlanInstance in the database
    PlanInstance.create(planInstance).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the PlanInstance."
        });
    })
};

// Find a single PlanInstance with a userId
exports.findOne = (req, res) => {
    console.log("Finding planInstance with Userid: " + req.params.userId);
    const userId = req.params.userId;
    PlanInstance.findByPk(userId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find PlanInstance with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving PlanInstance with userId=" + userId,
            });
        });
};

exports.addTask = (req, res) => {
    const userId = req.params.userId;
    console.log("Adding task to plan with userId: " + userId);
    if (req.body.taskId == null) {
        res.status(400).send({
            message: "TaskId is required!"
        });
        return;
    }

    PlanInstance.findOne({ where: { studentUserId: userId } })
        .then((planInstance) => {
            if (!planInstance) {
                res.status(404).send({
                    message: `Cannot find PlanInstance with userId=${userId}.`,
                });
                return;
            }

            const taskId = req.body.taskId;
            const semesterUntilGraduation = req.body.semesterUntilGraduation;
            // figure out the semester thing :v
            InstanceTask.create({
                planInstanceStudentUserId: userId,
                taskId: taskId,
                semesterUntilGraduation: semesterUntilGraduation,
                isPostponed: false,
            }).then((response) => {
                res.send(response);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the task to the PlanInstance."
                });
            })
        })

};

// Update a PlanInstance by the id in the request
exports.update = (req, res) => { }

// Delete a PlanInstance with the specified userId in the request
exports.delete = (req, res) => {
    const userId = req.params.userId;
    PlanInstance.destroy({
        where: { userId: userId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "PlanInstance was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot PlanInstance Role with userId=${userId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete PlanInstance with userId=" + userId,
            });
        });
};
