const db = require("../../models");
const StudentEvent = db.studentEvent;
const Student = db.student;
const User = db.user;

exports.getAllStudentsWithNames = async (req, res) => {
    try {
        const students = await db.student.findAll({
            include: [
                {
                    model: db.user,
                    as: "user",
                    attributes: ["fName", "lName"]
                }
            ]
        });

        const result = students.map(s => ({
            userId: s.userId,
            ocId: s.ocId,
            fName: s.user?.fName || "FirstName",
            lName: s.user?.lName || "LastName"
        }));

        res.send(result);
    } catch (err) {
        console.error("Error fetching students with names:", err);
        res.status(500).send({
            message: err.message || "Error retrieving students with names."
        });
    }
};

exports.getStudentsForEvent = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const studentEvents = await StudentEvent.findAll({
            where: { eventID: eventId },
            include: [
                {
                    model: Student,
                    as: "student",
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["fName", "lName"]
                        }
                    ]
                }
            ]
        });

        const result = studentEvents.map(entry => {
            const student = entry.student || {};
            const user = student.user || {};

            return {
                userId: student.userId ?? entry.studentUserID,
                ocId: student.ocId ?? entry.studentOCID,
                fName: user.fName || entry.fName || "FirstName",
                lName: user.lName || entry.lName || "LastName",
                status: entry.status ?? 0
            };
        });

        res.send(result);
    } catch (err) {
        console.error("Error in getStudentsForEvent:", err);
        res.status(500).send({
            message: err.message || "Error retrieving students for event."
        });
    }
};

exports.addStudentToEvent = async (req, res) => {
    const { studentUserID, studentOCID, eventID, status, fName, lName } = req.body;

    if (!studentOCID || !eventID) {
        return res.status(400).send({
            message: "Missing required studentOCID or eventID."
        });
    }

    try {
        // Check if a studentEvent with same OCID and eventID already exists
        const existing = await StudentEvent.findOne({
            where: {
                studentOCID: studentOCID,
                eventID: eventID
            }
        });

        if (existing) {
            return res.status(409).send({
                message: `Student with OC ID ${studentOCID} is already added to this event.`
            });
        }

        const newEntry = {
            studentUserID: studentUserID || null,
            studentOCID,
            eventID,
            status: status ?? 0,
            fName: fName ?? null,
            lName: lName ?? null
        };

        const data = await StudentEvent.create(newEntry);
        res.status(201).send(data);

    } catch (err) {
        console.error("Error inserting studentEvent:", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding the student to the event."
        });
    }
};

exports.updateStudentStatus = async (req, res) => {
    const { eventId, studentUserID } = req.params;
    const { status } = req.body;

    try {
        const result = await StudentEvent.update(
            { status: status },
            {
                where: {
                    eventID: eventId,
                    studentUserID: studentUserID,
                },
            }
        );

        if (result[0] === 1) {
            const event = await db.event.findByPk(eventId, {
                include: {
                    model: db.task,
                    as: "task",
                },
            });

            if (event?.task?.isExperience && status === 1) {
                const instanceTask = await db.instanceTask.findOne({
                    where: {
                        taskId: event.taskId,
                        planInstanceStudentUserId: studentUserID
                    }
                });

                if (instanceTask) {
                    await instanceTask.update({ completionDate: new Date() });
                    console.log(`Marked instanceTask ${instanceTask.id} as complete.`);
                } else {
                    console.log(`No matching instanceTask found for studentUserID: ${studentUserID} and taskId: ${event.taskId}`);
                }
            }
            res.send({ message: "Student status was updated successfully." });
        } else {
            res.status(404).send({ message: "Student or Event not found." });
        }
    } catch (error) {
        console.error("Error updating student status:", error);
        res.status(500).send({ message: "Server error while updating status." });
    }
};

exports.deleteStudentFromEvent = async (req, res) => {
    const { eventId, studentUserID, studentOCID } = req.body;

    const whereClause = {
        eventID: eventId
    };

    if (studentUserID !== null && studentUserID !== undefined) {
        whereClause.studentUserID = studentUserID;
    } else if (studentOCID !== null && studentOCID !== undefined) {
        whereClause.studentOCID = studentOCID;
    } else {
        return res.status(400).send({ message: "Missing studentUserID or studentOCID." });
    }

    try {
        const result = await StudentEvent.destroy({ where: whereClause });

        if (result === 1) {
            res.send({ message: "Student was successfully removed from the event." });
        } else {
            res.status(404).send({ message: "Student or Event not found." });
        }
    } catch (error) {
        console.error("Error deleting student from event:", error);
        res.status(500).send({ message: "Server error while deleting student from event." });
    }
};