require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const Role = db.role;
const Major = db.major;

const seedRoles = async () => {
  const defaultRoles = [
    { id: 1, name: "student" },
    { id: 2, name: "admin" },
  ];

  for (const role of defaultRoles) {
    await Role.findOrCreate({
      where: { id: role.id },
      defaults: role,
    });
  }
};

const seedMajors = async () => {
  const defaultMajors = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Bible" },
    { id: 3, name: "Math" },
    { id: 4, name: "Electrical Engineering" }
  ];

  for (const major of defaultMajors) {
    await Major.findOrCreate({
      where: { id: major.id },
      defaults: major,
    });
  }
}


db.sequelize.sync().then(() => {
  seedRoles()
  seedMajors()
});

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
require("./app/routes/eagle-flight/badge.route.js")(app);
// require("./app/routes/eagle-flight/redeemable.route.js")(app);
require("./app/routes/eagle-flight/event.routes.js")(app);

require("./app/routes/eagle-flight/redeemable.routes.js")(app);
require("./app/routes/eagle-flight/studentRedeemable.routes.js")(app);

require("./app/routes/eagle-flight/major.routes.js")(app);
require("./app/routes/eagle-flight/plan.routes.js")(app);
require("./app/routes/eagle-flight/generalSemester.routes.js")(app);
require("./app/routes/eagle-flight/planInstance.routes.js")(app);
require("./app/routes/eagle-flight/instanceTask.routes.js")(app);


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
