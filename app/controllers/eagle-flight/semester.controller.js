const db = require("../../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;

// Create and Save a new Semester
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description) {
        res.status(400).send({
            message: "Semester needs a name and description!",
        });
        return;
    }
    // Create a Semester
    const semester = {
        name: req.body.name,
        description: req.body.description,
        points: req.body.points
    };

    console.log("Creating semester " + semester.name);
    // Trying to save Semester in the database
    Semester.create(semester).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Semester."
        });
    })
};

// Retrieve all Semesters from the database.
exports.findAll = (req, res) => {
    Semester.findAll()
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

// Find a single Semester with an id
exports.findOne = (req, res) => {
    console.log("Finding semester with id: " + req.params.id);
    const id = req.params.id;
    Semester.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Semester with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Semester with id=" + id,
            });
        });
};

// Update a Semester by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating semester with id: " + id);

    Semester.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Semester was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Semester with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Semester with id=" + id,
            });
        });
};

// Delete a Semester with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Semester.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Semester was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot Semester Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Semester with id=" + id,
            });
        });
};

