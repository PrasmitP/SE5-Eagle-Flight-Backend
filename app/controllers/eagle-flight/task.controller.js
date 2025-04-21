const db = require("../../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description) {
        res.status(400).send({
            message: "Task needs a name and description!",
        });
        return;
    }
    // Create a Task
    const task = {
        name: req.body.name,
        description: req.body.description,
        points: req.body.points,
        isExperience: req.body.isExperience ? req.body.isExperience : false,
    };

    console.log("Creating task " + task.name);
    // Trying to save Task in the database
    Task.create(task).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Task."
        });
    })
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    Task.findAll()
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

// Find a single Task with an id
exports.findOne = (req, res) => {
    console.log("Finding task with id: " + req.params.id);
    const id = req.params.id;
    Task.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Task with id=" + id,
            });
        });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating task with id: " + id);

    Task.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Task was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Task with id=" + id,
            });
        });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Task.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot Task Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Task with id=" + id,
            });
        });
};

