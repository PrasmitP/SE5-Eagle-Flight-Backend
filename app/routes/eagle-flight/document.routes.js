module.exports = (app) => {
    const document = require("../../controllers/eagle-flight/document.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Document
    router.post("/", [authenticate], document.create);
  
    // Retrieve all Documents
    router.get("/", [authenticate], document.findAll);
  
    // Retrieve a single Document with id
    router.get("/:id", [authenticate], document.findOne);
  
    // Update a Document with id
    router.put("/:id", [authenticate], document.update);
  
    // Delete a Document with id
    router.delete("/:id", [authenticate], document.delete);
  
    // Delete all Documents
    router.delete("/", [authenticate], document.deleteAll);
  
    app.use("/document", router);
  };