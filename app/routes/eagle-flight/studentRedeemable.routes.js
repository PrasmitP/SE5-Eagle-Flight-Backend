  module.exports = (app) => {
    const studentRedeemables = require("../../controllers/eagle-flight/studentRedeemable.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new StudentRedeemable
    router.post("/", studentRedeemables.create);
  
    // Get all StudentRedeemables
    router.get("/", studentRedeemables.findAll);
  
    // Get all items redeemed by a specific student
    router.get("/student/:studentUserId", studentRedeemables.findByStudent);
  
    // Get all students who redeemed a specific reward
    router.get("/redeemable/:redeemableId", studentRedeemables.findByRedeemable);
  
    app.use("/api/studentRedeemables", router);
  };