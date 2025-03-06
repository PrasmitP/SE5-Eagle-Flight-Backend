module.exports = (app) => {
    console.log("Registering document routes...");
    const document = require("../../controllers/eagle-flight/document.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Add debug middleware
    router.use((req, res, next) => {
        console.log(`Document route hit: ${req.method} ${req.url}`);
        next();
    });

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