const db = require("../../models");
const Major = db.major;
const Op = db.Sequelize.Op;

// Create and Save a new Major
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Major needs a name!",
        });
        return;
    }
    // Create a Major
    const major = {
        name: req.body.name,
        planId: req.body.planId,
    };

    console.log("Creating major " + major.name);
    // Trying to save Major in the database
    Major.create(major).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Major."
        });
    })
};

// Retrieve all Majors from the database.
exports.findAll = (req, res) => {
    const majorName = req.query.name;
    var condition = majorName ? { name: { [Op.like]: `%${majorName}%` } } : null;
    Major.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Majors.",
            });
        });
};

// Find a Major for a user with a UserId
exports.findForUser = (req, res) => {
    console.log("Finding major for user with id: " + req.params.userId);
    const userId = req.params.userId;
    Major.findAll({ where: { userId: userId } })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Major for user with id=${userId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Error retrieving Majors for user with id=" + userId,
            });
        });
};

// Find a single Major with an id
exports.findOne = (req, res) => {
    console.log("Finding award with id: " + req.params.awardId);

    const id = req.params.id;
    Major.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Major with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Major with id=" + id,
            });
        });
};

// Update a Major by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating major with id: " + id);

    Major.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Major was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Major with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Major with id=" + id,
            });
        });
};

// Delete a Major with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Major.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Major was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Major with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Major with id=" + id,
            });
        });
};

