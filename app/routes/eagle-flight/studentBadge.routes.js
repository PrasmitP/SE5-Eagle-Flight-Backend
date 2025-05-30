module.exports = (app) => {
  const studentBadge = require("../../controllers/eagle-flight/studentBadge.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");
  const router = require("express").Router();

  // Assign a badge to a student
  // router.post("/", [authenticate], studentBadge.assignBadge);
  router.post("/", studentBadge.assignBadge);

  // Remove a badge from a student
  // router.delete("/:studentId/:badgeId", [authenticate], studentBadge.revokeBadge);
  router.delete("/:studentId/:badgeId", studentBadge.revokeBadge);

  router.get("/getAllStudentsWithNames", studentBadge.getAllStudentBadgesWithNames);

  // Get all badge IDs for a student (used for checking unlocks)
  // router.get("/:studentId", [authenticate], studentBadge.getBadgesByStudent);
  router.get("/:studentId", studentBadge.getBadgesByStudent);

  router.get("/student/by-user/:userId", studentBadge.getStudentByUserId);

  app.use("/studentBadge", router);
};