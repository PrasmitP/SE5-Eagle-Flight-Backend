module.exports = (app) => {
    const semester = require("../../controllers/eagle-flight/semester.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Semester
    router.post("/", semester.create);

    // Retrieve all Semesters
    router.get("/", semester.findAll);

    // Retrieve a single Semester with id
    router.get("/:id", semester.findOne);

    // Update a Semester with id
    router.put("/:id", semester.update);

    // Delete a Semester with id
    router.delete("/:id", semester.delete);

    app.use("/semester", router);
};
