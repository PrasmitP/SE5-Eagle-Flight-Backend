module.exports = (app) => {
    const plan = require("../../controllers/eagle-flight/plan.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Plan
    router.post("/", plan.create);

    // Retrieve all Plans
    router.get("/", plan.findAll);

    // Retrieve a single Plan with id including tasks and taskInSemester (semesterUntilGraduation)
    router.get("/:id", plan.findOne);

    // Retrieve a plan with a major Id
    router.get("/major/:majorId", plan.findForMajorId);

    // Add a task to a Plan with semesterUntilGraduation
    router.post("/:planId/addTask", plan.addTask);

    // Update the semesterUntilGraduation given the plan Id and task Id
    router.put("/:id/task/:taskId", plan.updateSemester);

    // Delete a task from a Plan with id
    router.delete("/:id/task/:taskId", plan.deleteTask);

    // Update a Plan with id
    router.put("/:id", plan.update);

    // Delete a Plan with id
    router.delete("/:id", plan.delete);

    // Delete all tasks in a plan
    router.delete("/:planId/tasks", plan.deleteAllTasksForPlanId);

    //================

    // Create an InstancePlan
    router.post("/plan-instance/start/:userId", plan.startInstancePlan);

    // Populate an InstancePlan
    router.post("/plan-instance/populate/:userId", plan.populateInstancePlan);

    app.use("/plan", router);
};
