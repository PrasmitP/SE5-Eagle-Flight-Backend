const db = require("../../models");
const Plan = db.plan;
const Student = db.student;
const PlanInstance = db.planInstance;
const instanceTask = db.instanceTask;
const Task = db.task;
const Major = db.major;
const TaskInSemester = db.taskInSemester;
const Op = db.Sequelize.Op;

// Create and Save a new Plan
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Plan needs a title!",
        });
        return;
    }
    // Create a Plan
    const plan = {
        title: req.body.title
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
    Major.findOne({ where: { id: majorId }, include: ["plan"] })
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
    const id = req.params.planId;
    console.log("Adding task to plan with planId: " + id);
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

exports.deleteAllTasksForPlanId = (req, res) => {
    const planId = req.params.planId;
    console.log("Deleting all tasks for plan with id: " + planId);
    TaskInSemester.destroy({ where: { planId: planId } })
        .then((num) => {
            if (num > 0) {
                res.status(200).send({
                    message: "Tasks were deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete tasks for Plan with id=${planId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete tasks for Plan with id=" + planId,
            });
        });
}

exports.startInstancePlan = async (req, res) => {
    try {
        const userId = req.params.userId;

        const student = await Student.findOne({
            where: { userId: userId },
        });

        if (!student) {
            return res.status(404).send({ message: "Student not found." });
        }

        const major = await Major.findOne({
            where: { id: student.majorId },
        });

        if (!major) {
            return res.status(404).send({ message: "Major not found." });
        }

        const planId = major.planId;

        const instance = await PlanInstance.create({
            studentUserId: userId,
            planId: planId,
        });

        return res.status(201).send(instance);

    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the InstancePlan.",
        });
    }
};

exports.populateInstancePlan = async (req, res) => {
    try {
        const userId = req.params.userId;

        const planInstance = await PlanInstance.findOne({
            where: { studentUserId: userId },
            attributes: ['studentUserId'],
            include: {
                model: Plan,
                attributes: ['id'],
                include: {
                    model: Task,
                    attributes: ['id'],
                    through: {
                        attributes: ['semesterUntilGraduation'],
                    },
                },
            },
        });

        if (!planInstance) {
            return res.status(404).send({ message: "Plan instance not found." });
        }

        const transformed = planInstance.plan.tasks.map(task => ({
            taskId: task.id,
            semesterUntilGraduation: task.taskInSemester.semesterUntilGraduation
        }));

        for (pair of transformed) {
            await instanceTask.create({
                planInstanceStudentUserId: userId,
                taskId: pair.taskId,
                semesterUntilGraduation: pair.semesterUntilGraduation,
                isPostponed: false,
            });
        }

        return res.status(200).send(transformed);

    } catch (err) {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving the InstancePlan.",
        });
    }
};
