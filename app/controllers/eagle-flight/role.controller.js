const db = require("../../models");
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Role needs a name!",
        });
        return;
    }
    // Create a Role
    const role = {
        name: req.body.name
    };

    console.log("Creating role " + role.name);
    // Trying to save Role in the database
    Role.create(role).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Role."
        });
    })
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    const roleName = req.query.name;
    var condition = roleName ? { name: { [Op.like]: `%${roleName}%` } } : null;
    Role.findAll({ where: condition })
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

// Find a Role for a user with a UserId
exports.findForUser = (req, res) => {
    console.log("Finding role for user with id: " + req.params.userId);
    const userId = req.params.userId;
    Role.findAll({ where: { userId: userId } })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Role for user with id=${userId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Error retrieving Roles for user with id=" + userId,
            });
        });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
    console.log("Finding award with id: " + req.params.awardId);

    const id = req.params.id;
    Role.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Role with id=" + id,
            });
        });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating role with id: " + id);

    Role.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Role with id=" + id,
            });
        });
};

//Update relation for award
// exports.updateRelation = async (req, res) => {
//     const id = req.params.id;
//     console.log("Updating relationship of award with id: " + id);

//     try {
//         // Find the Award instance by primary key
//         const awardInstance = await Award.findByPk(id);

//         if (!awardInstance) {
//             res.status(404).send({
//                 message: `Award with id=${id} not found.`,
//             });
//             return;
//         }

//         // Handle removeResumeId
//         if (req.body.removeResumeId) {
//             await awardInstance.removeResume(req.body.removeResumeId);
//             res.send({
//                 message: `Successfully removed Resume with id=${req.body.removeResumeId} from Award with id=${id}.`,
//             });
//             return;
//         }

//         // Handle addResumeId
//         if (req.body.addResumeId) {
//             await awardInstance.addResume(req.body.addResumeId);
//             res.send({
//                 message: `Successfully added Resume with id=${req.body.addResumeId} to Award with id=${id}.`,
//             });
//             return;
//         }

//         // If neither addResumeId nor removeResumeId is provided
//         res.status(400).send({
//             message: "Invalid request body! Need addResumeId or removeResumeId.",
//         });

//     } catch (err) {
//         // Handle errors
//         res.status(500).send({
//             message:
//                 err.message || `Some error occurred while updating the relationship for Award with id=${id}.`,
//         });
//     }
// };

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Role.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Role was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Role with id=" + id,
            });
        });
};

