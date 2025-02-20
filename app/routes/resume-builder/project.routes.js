module.exports = (app) => {
    const projects = require("../../controllers/resume-builder/project.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Project
    router.post("/", [authenticate], projects.create);

    // Retrieve all Project
    router.get("/", [authenticate], projects.findAll);

    // Retrieve all Project for user
    router.get("/userProjects/:userId", [authenticate], projects.findAllForUser);

    // Retrieve a single Project with id
    router.get("/:id", [authenticate], projects.findOne);

    // Update an Project with id
    router.put("/:id", [authenticate], projects.update);

    // Update relation for Project
    router.put("/updateRelation/:id", [authenticate], projects.updateRelation);

    // Delete an Project with id
    router.delete("/:id", [authenticate], projects.delete);

    // Delete all Project
    router.delete("/", [authenticate], projects.deleteAll);

    app.use("/projects", router);
};
