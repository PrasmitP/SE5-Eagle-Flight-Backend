module.exports = app => {
  const userFlightPlan = require("../../controllers/eagle-flight/userFlightPlan.controller.js");
  const router = require("express").Router();

  // Admin-only route to fetch all users and their flight plan progress
  router.get("/", userFlightPlan.findAllWithProgress);

  app.use("/admin/userFlightPlans", router);
};