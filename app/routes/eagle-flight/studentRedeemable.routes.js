module.exports = (app) => {
    const studentRedeemable = require("../../controllers/eagle-flight/studentRedeemable.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new StudentRedeemable (student redeems a reward)
    router.post("/", studentRedeemable.create);
  
    // Retrieve all StudentRedeemables
    router.get("/", studentRedeemable.findAll);
  
    // Retrieve all Redeemables redeemed by a specific student
    router.get("/student/:studentUserId", studentRedeemable.findByStudent);
  
    // Retrieve all Students who redeemed a specific reward
    router.get("/redeemable/:redeemableId", studentRedeemable.findByRedeemable);
  
    app.use("/studentRedeemable", router);
  };