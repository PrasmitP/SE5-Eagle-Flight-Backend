module.exports = (app) => {
    const roles = require("../../controllers/eagle-flight/role.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new Role
    router.post("/", roles.create);

    // Retrieve all Roles
    router.get("/", roles.findAll);

    // Retrieve all Role for user
    router.get("/userRoles/:userId", [authenticate], roles.findForUser);

    // Retrieve a single Role with id
    router.get("/:id", [authenticate], roles.findOne);

    // Update an Role with id
    router.put("/:id", [authenticate], roles.update);

    // Update relation for Role
    // router.put("/updateRelation/:id", [authenticate], roles.updateRelation);

    // Delete an Role with id
    router.delete("/:id", [authenticate], roles.delete);

    app.use("/role", router);
};
