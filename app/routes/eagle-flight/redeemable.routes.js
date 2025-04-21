module.exports = (app) => {
    const redeemables = require("../../controllers/eagle-flight/redeemable.controller.js");
  
    const router = require("express").Router();
  
    // Create a new Redeemable
    router.post("/", redeemables.create);
  
    // Retrieve all Redeemables
    router.get("/", redeemables.getAll);
  
    // Retrieve a single Redeemable by id
    router.get("/:id", redeemables.getOne);
  
    // Update a Redeemable with id
    router.put("/:id", redeemables.update);
  
    // Delete a Redeemable with id
    router.delete("/:id", redeemables.delete);
  
    // Delete all Redeemables
    router.delete("/", redeemables.deleteAll);
  
    // Register the routes under /redeemables path
    app.use("/redeemables", router);
  };