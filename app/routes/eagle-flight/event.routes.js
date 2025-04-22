module.exports = (app) => {
    const event = require("../../controllers/eagle-flight/event.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new event
    // router.post("/", [authenticate], event.create);
    router.post("/", event.create);
  
    // Retrieve all events
    // router.get("/", [authenticate], event.findAll);
    router.get("/", event.findAll);
  
    // Retrieve a single event with id
    // router.get("/:id", [authenticate], event.findOne);
    router.get("/:id", event.findOne);

    // Update a event with id
    // router.put("/:id", [authenticate], event.update);
    router.put("/:id", event.update);

    // Delete a event with id
    // router.delete("/:id", [authenticate], event.delete);
    router.delete("/:id", event.delete);

    // Delete all events
    // router.delete("/", [authenticate], event.deleteAll);
    router.delete("/", event.deleteAll);

    // Get students for event
    router.get("/:id/students", controller.getStudentsForEvent);
    
    app.use("/event", router);
  };
  