module.exports = (app) => {
    const instanceTask = require("../../controllers/eagle-flight/instanceTask.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();


    // Retrieve all instanceTasks for a given semesterUntilGraduation
    router.get("/:userId", instanceTask.findAll);

    app.use("/instanceTask", router);
};
