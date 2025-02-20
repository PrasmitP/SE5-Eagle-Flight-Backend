module.exports = (app) => {
  const user = require("../../controllers/resume-builder/user.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new User
  router.post("/", [authenticate], user.create);

  // Retrieve all People
  router.get("/", [authenticate], user.findAll);

  // Retrieve a single User with id
  router.get("/id/:id", [authenticate], user.findOne);

  // retrieve a single user with a name
  router.get("/name/:name", [authenticate], user.findByName);

  // Update a User with id
  router.put("/:id", [authenticate], user.update);

  // Delete a User with id
  router.delete("/:id", [authenticate], user.delete);

  // Delete all User
  router.delete("/", [authenticate], user.deleteAll);

  app.use("/user", router);
};
