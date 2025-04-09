module.exports = (app) => {
    const majors = require("../../controllers/eagle-flight/major.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Major
    router.post("/", majors.create);

    // Retrieve all Majors
    router.get("/", majors.findAll);

    // Retrieve a single Major with id
    router.get("/:id", majors.findOne);

    // Update an Major with id
    router.put("/:id", majors.update);

    // Delete an Major with id
    router.delete("/:id", majors.delete);

    app.use("/major", router);
};
