const db = require("../../models");
const StudentEvent = db.studentEvent;
const Student = db.student;
const User = db.user;

exports.getStudentsForEvent = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const students = await Student.findAll({
        include: [
            {
            model: db.event,
            as: "event",
            where: { id: eventId },
            through: {
                attributes: ["status", "reflection"]
            }
            },
            {
            model: User,
            as: "user",
            attributes: ["fName", "lName"]
            }
        ]
        });

        const result = students.map(s => ({
        userId: s.userId,
        ocId: s.ocId,
        fName: s.user?.fName || "FirstName",
        lName: s.user?.lName || "LastName",
        status: s.event[0]?.studentEvent?.status ?? 0
        }));

        res.send(result);
    } catch (err) {
        console.error("Error in getStudentsForEvent:", err);
        res.status(500).send({
        message: err.message || "Error retrieving students for event."
        });
    }
};  

exports.addStudentToEvent = (req, res) => {
    console.log("Trying to add student to event");
    console.log("Request body:", req.body);

    const { studentUserID, studentOCID, eventID, status } = req.body;

    if (!studentUserID || !eventID) {
        return res.status(400).send({
        message: "Missing required studentUserID or eventID."
        });
    }

    const newEntry = {
        studentUserID,
        studentOCID,
        eventID,
        status
    };

    console.log("Creating StudentEvent with status:", status);
    StudentEvent.create(newEntry)
        .then(data => {
            console.log("Saved studentEvent record:", data);
            res.status(201).send(data);
        })
        .catch(err => {
            console.error("Error inserting studentEvent:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while adding the student to the event."
            });
        });
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
    const { eventId, studentUserID } = req.params;

    try {
        const result = await StudentEvent.destroy({
        where: {
            eventID: eventId,
            studentUserID: studentUserID
        }
        });

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