require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Eagle-Flight Backend." });
});


require("./app/routes/eagle-flight/user.routes.js")(app);
require("./app/routes/eagle-flight/role.routes.js")(app);
require("./app/routes/eagle-flight/student.routes.js")(app);
require("./app/routes/eagle-flight/task.routes.js")(app);
require("./app/routes/eagle-flight/auth.routes.js")(app);
require("./app/routes/eagle-flight/redeemable.routes.js")(app);
require("./app/routes/eagle-flight/studentRedeemable.routes.js")(app);
require("./app/routes/eagle-flight/pointShop.routes.js")(app);

// Uncomment once we get back to the resume builder
// require("./app/routes/resume-builder/auth.routes.js")(app);
// require("./app/routes/resume-builder/user.routes.js")(app);
// require("./app/routes/resume-builder/resume.routes.js")(app);
// require("./app/routes/resume-builder/education.routes.js")(app);
// require("./app/routes/resume-builder/experience.routes.js")(app);
// require("./app/routes/resume-builder/skill.routes.js")(app);
// require("./app/routes/resume-builder/project.routes.js")(app);
// require("./app/routes/resume-builder/comment.routes.js")(app);
// require("./app/routes/resume-builder/award.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
