const db = require("../../models");
const Plan = db.plan;
const TaskInSemester = db.taskInSemester;
const Op = db.Sequelize.Op;

// Create and Save a new Plan
exports.create = (req, res) => {
    // Validate request
    if (!req.body.majorId) {
        res.status(400).send({
            message: "Plan needs a majorId!",
        });
        return;
    }
    // Create a Plan
    const plan = {
        majorId: req.body.majorId
    };

    console.log("Creating plan ");
    // Trying to save Plan in the database
    Plan.create(plan).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Plan."
        });
    })
};

// Retrieve all Plans from the database.
exports.findAll = (req, res) => {
    Plan.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Roles.",
            });
        });
};

// Find a single Plan with an id including tasks
exports.findOne = (req, res) => {
    console.log("Finding plan with id: " + req.params.id);
    const id = req.params.id;
    Plan.findByPk(id, { include: ["tasks"] })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Plan with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Plan with id=" + id,
            });
        });
};

exports.findForMajorId = (req, res) => {
    console.log("Finding plan with maJorId: " + req.params.majorId);
    const majorId = req.params.majorId;
    Plan.findOne({ where: { majorId: majorId }, include: ["tasks"] })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Plan with majorId=${majorId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Plan with majorId=" + majorId,
            });
        });

}

exports.addTask = (req, res) => {
    const id = req.params.id;
    console.log("Adding task to plan with id: " + id);
    if (req.body.taskId == null || req.body.semesterUntilGraduation == null) {
        res.status(400).send({
            message: "TaskId and semesterUntilGraduation are required!"
        });
        return;
    }

    Plan.findByPk(id)
        .then((plan) => {
            if (!plan) {
                res.status(404).send({
                    message: `Cannot find Plan with id=${id}.`,
                });
                return;
            }

            const taskId = req.body.taskId;
            const semesterUntilGraduation = req.body.semesterUntilGraduation;
            TaskInSemester.create({
                planId: id,
                taskId: taskId,
                semesterUntilGraduation: semesterUntilGraduation
            }).then((response) => {
                res.send(response);
            })
        })

};

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    console.log("Removing task from plan with id: " + id);
    if (req.params.taskId == null) {
        res.status(400).send({
            message: "TaskId is required!"
        });
        return;
    }

    Plan.findByPk(id)
        .then((plan) => {
            if (!plan) {
                res.status(404).send({
                    message: `Cannot find Plan with id=${id}.`,
                });
                return;
            }

            const taskId = req.params.taskId;
            TaskInSemester.destroy({ where: { planId: id, taskId: taskId } })
                .then((rowsDeleted) => {
                    if (rowsDeleted === 0) {
                        res.status(404).json({ message: "Task not found in plan." })
                    } else {
                        res.status(200).json({ message: "Task removed from plan." })
                    }
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message })
                })

        })

};

exports.updateSemester = (req, res) => {
    const id = req.params.id;
    const taskId = req.params.taskId;
    console.log("Updating semester for task with id: " + taskId + " in plan with id: " + id);
    if (req.body.semesterUntilGraduation == null) {
        res.status(400).send({
            message: "SemesterUntilGraduation is required!"
        });
        return;
    }
    newSemester = req.body.semesterUntilGraduation;
    TaskInSemester.findOne({ where: { planId: id, taskId: taskId } }).then(
        (taskInSemesterInstance) => taskInSemesterInstance.update({ semesterUntilGraduation: newSemester }).then(
            (response) => res.send(response)
        ).catch(
            (err) => res.status(500).send(
                {
                    message: err.message
                }
            )
        )
    ).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
}

// Update a Plan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating plan with id: " + id);

    Plan.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Plan was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Plan with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Plan with id=" + id,
            });
        });
};

// Delete a Plan with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Plan.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Plan was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot Plan Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Plan with id=" + id,
            });
        });
};

