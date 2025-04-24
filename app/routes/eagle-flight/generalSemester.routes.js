module.exports = (app) => {
    const generalSemester = require("../../controllers/eagle-flight/generalSemester.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new GeneralSemester
    router.post("/", generalSemester.create);

    // Retrieve all GeneralSemesters
    router.get("/", generalSemester.findAll);

    // Retrieve a single GeneralSemester with id
    router.get("/semester/:id", generalSemester.findOne);

    // Update a GeneralSemester with id
    router.put("/:id", generalSemester.update);

    // Delete a GeneralSemester with id
    router.delete("/:id", generalSemester.delete);

    router.get("/current", generalSemester.getCurrentSemester);

    router.post("/refresh-status", generalSemester.refreshStatus);

    app.use("/generalSemester", router);
};
