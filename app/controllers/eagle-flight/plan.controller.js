const db = require("../../models");
const Plan = db.plan;
const Op = db.Sequelize.Op;

// Create and Save a new Plan
exports.create = (req, res) => {
    // Validate request
    if (!req.majorId) {
        res.status(400).send({
            message: "Plan needs a majorId!",
        });
        return;
    }
    // Create a Plan
    const plan = {
        majorId: req.majorId,
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

// Find a single Plan with an id
exports.findOne = (req, res) => {
    console.log("Finding plan with id: " + req.params.id);
    const id = req.params.id;
    Plan.findByPk(id)
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

