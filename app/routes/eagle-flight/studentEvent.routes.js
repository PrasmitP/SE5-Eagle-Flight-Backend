module.exports = (app) => {
    const studentEvent = require("../../controllers/eagle-flight/studentEvent.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Add a student to an event
    // router.post("/", [authenticate], studentEvent.addStudentToEvent);
    router.post("/", studentEvent.addStudentToEvent);

    router.get("/getAllStudentsWithNames", studentEvent.getAllStudentsWithNames);

    // Get all students for a specific event
    // router.get("/:eventId", [authenticate], studentEvent.getStudentsForEvent);    
    router.get("/:eventId", studentEvent.getStudentsForEvent);


    // Update student's status (attending/not attending) for an event
    // router.put("/:eventId/:studentUserID", [authenticate], studentEvent.updateStudentStatus);
    router.put("/:eventId/:studentUserID", studentEvent.updateStudentStatus);

    // Delete a student from an event
    // router.delete("/:eventId/:studentUserID", [authenticate], studentEvent.deleteStudentFromEvent);
    router.delete("/:eventId/:studentUserID", studentEvent.deleteStudentFromEvent);
    // Delete a student (supporting fallback to studentOCID)
    router.post("/delete", studentEvent.deleteStudentFromEvent);


    // Optional: Delete all student-event records (careful with this)
    // router.delete("/", [authenticate], studentEvent.deleteAllStudentEvents);
    // router.delete("/", studentEvent.deleteAllStudentEvents);

    app.use("/studentEvent", router);
};