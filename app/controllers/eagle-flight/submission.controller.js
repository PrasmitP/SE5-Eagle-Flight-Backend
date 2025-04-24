const db = require("../../models");
const Submission = db.submission;
const Op = db.Sequelize.Op;

// Create and Save a new Submission
exports.create = async (req, res) => {
    try {
        console.log("Creating submission with body:", req.body);     // logs instanceTaskId and description
        console.log("Received file:", req.file);                     // logs image file info
        const { instanceTaskId, description } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const submission = await Submission.create({
            instanceTaskId,
            description,
            status: 'pending',
            imagePath
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || 'Error creating submission.'
        });
    }
};

// Retrieve all Submissions for a certain instanceTask.
exports.findAll = (req, res) => {

    const condition = req.params.instanceTaskId
        ? { where: { instanceTaskId: req.params.instanceTaskId } }
        : {
            include: [
                {
                    model: db.instanceTask,
                    as: 'instanceTask',
                    include: [
                        {
                            model: db.task,
                            as: 'task'
                        },
                        {
                            model: db.planInstance,
                            as: 'planInstance',
                            include: [
                                {
                                    model: db.student,
                                    as: 'student',
                                    include: [
                                        {
                                            model: db.user,
                                            as: 'user'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    Submission.findAll(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving submissions.",
            });
        });
};

// Find a single Submission with an id
exports.findOne = (req, res) => {
    console.log("Finding submission with id: " + req.params.id);
    const id = req.params.id;
    Submission.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Submission with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Submission with id=" + id,
            });
        });
};

// Update a Submission by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating submission with id: " + id);

    Submission.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Submission was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Submission with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Submission with id=" + id,
            });
        });
};

// Delete a Submission with the specified id in the request
const fs = require('fs');

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const submission = await Submission.findByPk(id);

        if (!submission) {
            return res.status(404).send({ message: 'Submission not found.' });
        }

        // Delete the image file if it exists
        if (submission.imagePath && fs.existsSync(submission.imagePath)) {
            fs.unlinkSync(submission.imagePath);
        }

        await Submission.destroy({ where: { id } });

        res.send({ message: 'Submission deleted successfully.' });
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error deleting submission.' });
    }
};

