module.exports = (app) => {
  const auth = require("../../controllers/resume-builder/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/login", auth.login);

  // Authorization
  router.post("/authorize/:id", auth.authorize);

  // Logout
  router.post("/logout", auth.logout);

  app.use("", router);
};
