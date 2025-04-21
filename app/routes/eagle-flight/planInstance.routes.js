module.exports = (app) => {
    const planInstance = require("../../controllers/eagle-flight/planInstance.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new PlanInstance
    router.post("/", planInstance.create);

    // Retrieve a single PlanInstance with a userId
    router.get("/:userId", planInstance.findOne);

    // Add a task to a PlanInstance with userId
    router.post("/:userId/addTask", planInstance.addTask);

    // Delete a PlanInstance with id
    router.delete("/:id", planInstance.delete);

    app.use("/plan-instance", router);
};
