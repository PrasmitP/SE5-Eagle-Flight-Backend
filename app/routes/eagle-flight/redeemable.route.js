module.exports = (app) => {
    const redeemable = require("../../controllers/eagle-flight/redeemable.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new redeemable
    // router.post("/", [authenticate], redeemable.create);
    router.post("/", redeemable.create);
  
    // Retrieve all redeemables
    // router.get("/", [authenticate], redeemable.findAll);
    router.get("/", redeemable.getAll);
  
    // Retrieve a single redeemable with id
    // router.get("/:id", [authenticate], redeemable.findOne);
    router.get("/:id", redeemable.getOne);

    // Update a redeemable with id
    // router.put("/:id", [authenticate], redeemable.update);
    router.put("/:id", redeemable.update);

    // Delete a redeemable with id
    // router.delete("/:id", [authenticate], redeemable.delete);
    router.delete("/:id", redeemable.delete);

    // Delete all redeemables
    // router.delete("/", [authenticate], redeemable.deleteAll);
    router.delete("/", redeemable.deleteAll);
    
    app.use("/redeemable", router);
  };
  