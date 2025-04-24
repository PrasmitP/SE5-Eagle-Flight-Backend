module.exports = (app) => {
    const instanceTask = require("../../controllers/eagle-flight/instanceTask.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Retrieve all instanceTasks for a given userId
    router.get("/:userId", instanceTask.findAll);

    // Update a TaskInSemester by the id in the request
    router.put("/:id", instanceTask.update);

    app.use("/instanceTask", router);
};
