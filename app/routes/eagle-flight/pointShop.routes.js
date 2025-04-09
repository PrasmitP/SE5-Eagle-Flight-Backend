module.exports = (app) => {
  const pointShop = require("../../controllers/eagle-flight/pointShop.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");
  const router = require("express").Router();

  // Redeem an item
  router.post("/redeem", pointShop.redeem);

  // Get all redeemable items
  router.get("/redeemables", pointShop.findAllItems);

  // Create a new redeemable item
  router.post("/redeemables", pointShop.createItem);

  // Delete a redeemable item
  router.delete("/redeemables/:id", pointShop.deleteItem);

  // Get all redemptions by a student
  router.get("/student/:studentUserId/redemptions", pointShop.findRedemptionsByStudent);

  app.use("/pointshop", router);
};