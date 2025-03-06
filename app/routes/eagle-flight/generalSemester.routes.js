module.exports = (app) => {
    const generalSemester = require("../../controllers/eagle-flight/generalSemester.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new GeneralSemester
    router.post("/", generalSemester.create);

    // Retrieve all GeneralSemesters
    router.get("/", plan.findAll);

    // Retrieve a single GeneralSemester with id
    router.get("/:id", plan.findOne);

    // Update a GeneralSemester with id
    router.put("/:id", plan.update);

    // Delete a GeneralSemester with id
    router.delete("/:id", generalSemester.delete);

    app.use("/generalSemester", router);
};
