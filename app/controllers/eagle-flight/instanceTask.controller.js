const db = require("../../models");
const InstanceTask = db.instanceTask;
const Op = db.Sequelize.Op;

// Create and Save a new Task FPInstance Relationship
// exports.create = async (req, res) => {
//     // Validate request
//     if (!req.body.name) {
//         res.status(400).send({
//             message: "Major needs a name!",
//         });
//         return;
//     }
//     // Create a Major
//     const major = {
//         name: req.body.name
//     };

//     console.log("Creating major " + major.name);
//     // Trying to save Major in the database
//     Major.create(major).then((data) => {
//         res.send(data);
//     }).catch((err) => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occurred while creating the Major."
//         });
//     })
// };

// Retrieve all instanceTasks from the database for a specific student.
exports.findAll = (req, res) => {
    const userId = req.params.userId;

    InstanceTask.findAll({
        where: { planInstanceStudentUserId: userId },
        include: ["task", "submissions"]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instanceTasks.",
            });
        });
};

// Update a InstanceTask by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating instanceTask with id: " + id);

    InstanceTask.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "InstanceTask was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update InstanceTask with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating InstanceTask with id=" + id,
            });
        });
};