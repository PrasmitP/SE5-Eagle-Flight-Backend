module.exports = (app) => {
    const task = require("../../controllers/eagle-flight/task.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Task
    router.post("/", task.create);

    // Retrieve all Tasks
    router.get("/", task.findAll);

    // Retrieve a single Task with id
    router.get("/:id", task.findOne);

    // Update a Task with id
    router.put("/:id", task.update);

    // Delete a Task with id
    router.delete("/:id", task.delete);

    app.use("/task", router);
};
