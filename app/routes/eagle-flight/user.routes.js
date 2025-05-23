module.exports = (app) => {
    const user = require("../../controllers/eagle-flight/user.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all People
    router.get("/", user.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", user.findOne);
  
    // Update a User with an id
    router.put("/:id", user.update);
  
    // Delete a User with an id
    router.delete("/:id", user.delete);
  
    // Delete all Users
    router.delete("/", [authenticate], user.deleteAll);
  
    app.use("/user", router);
  };
  