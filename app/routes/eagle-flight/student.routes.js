module.exports = (app) => {
  const student = require("../../controllers/eagle-flight/student.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Student
  router.post("/", student.create);

  // Retrieve all Students
  router.get("/", student.findAll);

  // Retrieve a single Student with an ocId
  router.get("/:ocId", student.findOne);

  // Retrieve a single Student with a userId
  router.get("/userId/:userId", student.findOneForUserId);

  // Update a Student with ocId
  router.put("/:ocId", student.update);

  // retrieve all Students with a certain fName and lName
  router.get("/name/:name", student.findStudentsByName);

  app.use("/student", router);
};
