module.exports = (app) => {
    const student = require("../../controllers/eagle-flight/student.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Student
    // router.post("/", [authenticate], student.create);
    router.post("/", student.create);
  
    // Retrieve all People
    // router.get("/", [authenticate], student.findAll);
    router.get("/", student.findAll);
  
    // Retrieve a single Student with id
    router.get("/id/:id", [authenticate], student.findOne);
  
    // retrieve a single student with a name
    router.get("/name/:name", [authenticate], student.findByName);
  
    // Update a Student with id
    router.put("/:id", [authenticate], student.update);
  
    // Delete a Student with id
    router.delete("/:id", [authenticate], student.delete);
  
    // Delete all Students
    router.delete("/", [authenticate], student.deleteAll);
  
    app.use("/student", router);
  };
  