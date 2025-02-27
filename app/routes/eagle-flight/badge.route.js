module.exports = (app) => {
    const badge = require("../../controllers/eagle-flight/badge.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new badge
    // router.post("/", [authenticate], badge.create);
    router.post("/", badge.create);
  
    // Retrieve all badges
    // router.get("/", [authenticate], badge.findAll);
    router.get("/", badge.findAll);
  
    // Retrieve a single badge with id
    router.get("/:id", [authenticate], badge.findOne);
  
    // Update a badge with id
    router.put("/:id", [authenticate], badge.update);
  
    // Delete a badge with id
    router.delete("/:id", [authenticate], badge.delete);
  
    // Delete all badges
    router.delete("/", [authenticate], badge.deleteAll);
  
    app.use("/badge", router);
  };
  