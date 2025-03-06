module.exports = (app) => {
    const plan = require("../../controllers/eagle-flight/plan.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Plan
    router.post("/", plan.create);

    // Retrieve all Plans
    router.get("/", plan.findAll);

    // Retrieve a single Plan with id
    router.get("/:id", plan.findOne);

    // Update a Plan with id
    router.put("/:id", plan.update);

    // Delete a Plan with id
    router.delete("/:id", plan.delete);

    app.use("/plan", router);
};
