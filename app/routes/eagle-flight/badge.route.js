module.exports = (app) => {
  const badge = require("../../controllers/eagle-flight/badge.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");
  const router = require("express").Router();
  const uploadBadge = require("../../middleware/uploadBadge"); // Correctly named
  const fs = require('fs');
  const path = require('path');

  router.get("/check-image/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../../../uploads/badge-images", req.params.filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send({ message: "Image not found" });
      }
      res.send({ message: "Image exists" });
    });
  });

  router.post(
    "/", 
    uploadBadge.single('image'), 
    badge.create
  );

  router.get("/", badge.findAll);

  router.get("/:id", badge.findOne);

  router.put(
    "/:id", 
    uploadBadge.single('image'), 
    badge.update
  );

  router.delete("/:id", badge.delete);

  router.delete("/", badge.deleteAll);

  app.use("/badge", router);
};
