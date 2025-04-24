const db = require("../../models");
const GeneralSemester = db.generalSemester;
const Student = db.student;
const InstanceTask = db.instanceTask;
const Op = db.Sequelize.Op;

// Create and Save a new GeneralSemester
exports.create = (req, res) => {
    // Validate request
    if (!req.body.season || !req.body.year) {
        res.status(400).send({
            message: "GeneralSemester needs a season and a year!",
        });
        return;
    }
    // Create a GeneralSemester
    const generalSemester = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        season: req.body.season,
        year: req.body.year,
    };

    console.log("Creating generalSemester " + generalSemester.season + " " + generalSemester.year);
    // Trying to save GeneralSemester in the database
    // Would be nice ot check if it already exists. Dont have time to do that now, though.
    GeneralSemester.create(generalSemester).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the GeneralSemester."
        });
    })
};

// Retrieve all GeneralSemesters from the database.
exports.findAll = (req, res) => {
    GeneralSemester.findAll()
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

// Find a single GeneralSemester with an id
exports.findOne = (req, res) => {
    console.log("Finding generalSemester with id: " + req.params.id);
    const id = req.params.id;
    GeneralSemester.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find GeneralSemester with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving GeneralSemester with id=" + id,
            });
        });
};

// Update a GeneralSemester by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("Updating generalSemester with id: " + id);

    GeneralSemester.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "GeneralSemester was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update GeneralSemester with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating GeneralSemester with id=" + id,
            });
        });
};

// Delete a GeneralSemester with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    GeneralSemester.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "GeneralSemester was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot GeneralSemester Role with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete GeneralSemester with id=" + id,
            });
        });
};

// Helper function
function calculateSemesterUntilGraduation(graduationYear, graduationSemester, currentYear, currentSemester) {

    const semesterMap = { spring: 0, fall: 1 };

    const gradIndex = graduationYear * 2 + semesterMap[graduationSemester];
    const currentIndex = currentYear * 2 + semesterMap[currentSemester];

    return gradIndex - currentIndex + 1;
}

exports.refreshStatus = async (req, res) => {
    const currentDate = new Date();
    let currentSemester;

    try {
        currentSemester = await GeneralSemester.findOne({
            where: {
                startDate: { [Op.lte]: currentDate },
                endDate: { [Op.gte]: currentDate }
            }
        });

        if (!currentSemester) {
            return res.status(404).json({ message: "No active semester found for current date." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error finding current semester." });
    }

    try {
        const students = await Student.findAll();
        let totalRowsUpdated = 0;

        for (const student of students) {
            const semesterUntilGraduation = calculateSemesterUntilGraduation(
                student.graduationYear,
                student.graduationSemester,
                currentSemester.year,
                currentSemester.season
            );

            if (semesterUntilGraduation < 1 || semesterUntilGraduation >= 8) {
                continue;
            }
            const tasksToPostpone = await InstanceTask.findAll({
                where: {
                    planInstanceStudentUserId: student.userId,
                    isPostponed: false,
                    completionDate: null,
                    semesterUntilGraduation: { [Op.gt]: semesterUntilGraduation }
                }
            });

            // Mark old tasks as postponed
            await InstanceTask.update(
                { isPostponed: true },
                {
                    where: {
                        id: tasksToPostpone.map(t => t.id)
                    }
                }
            );

            // Create new tasks
            const newTasks = tasksToPostpone.map(old => ({
                taskId: old.taskId,
                planInstanceStudentUserId: old.planInstanceStudentUserId,
                semesterUntilGraduation: semesterUntilGraduation,
                isPostponed: false,
                completionDate: null,
            }));

            await InstanceTask.bulkCreate(newTasks);

            totalRowsUpdated += tasksToPostpone.length;
        }

        res.status(200).json({
            message: "Postponement refresh completed.",
            totalRowsUpdated
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing instance tasks." });
    }
};

exports.getCurrentSemester = async (req, res) => {
    const currentDate = new Date();
    let currentSemester;

    try {
        currentSemester = await GeneralSemester.findOne({
            where: {
                startDate: { [Op.lte]: currentDate },
                endDate: { [Op.gte]: currentDate }
            }
        });

        if (!currentSemester) {
            return res.status(404).json({ message: "No active semester found for current date." });
        }

        res.status(200).json(currentSemester);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error finding current semester." });
    }
};
