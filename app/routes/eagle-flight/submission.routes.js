module.exports = (app) => {
    const submission = require("../../controllers/eagle-flight/submission.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
    var router = require("express").Router();
    const upload = require("../../middleware/upload.js");

    // Create a new Submission
    router.post("/", upload.single('image'), submission.create);

    // Retrieve all Submissions for an instance task
    router.get("/:instanceTaskId", submission.findAll);

    // Get image by filename
    const path = require('path');
    router.get('/image/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../../../uploads/submissions', filename);
      
        res.sendFile(filePath, (err) => {
          if (err) {
            res.status(404).send({ message: 'Image not found.' });
          }
          else {
            console.log('Image sent:', filename);
          }
        });
      });

    // Retrieve all Submissions
    router.get("/", submission.findAll);

    // Retrieve a single Submission with id
    router.get("/submission/:id", submission.findOne);

    // Update a Submission with id
    router.put("/:id", submission.update);

    // Delete a Submission with id
    router.delete("/:id", submission.delete);

    app.use("/submission", router);
};
