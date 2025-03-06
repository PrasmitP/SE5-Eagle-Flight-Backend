require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
}).catch((err) => {
    console.log("Failed to sync database:", err);
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
  res.json({ message: "Welcome to bezkoder application." });
});


require("./app/routes/eagle-flight/user.routes.js")(app);
require("./app/routes/eagle-flight/role.routes.js")(app);
require("./app/routes/eagle-flight/student.routes.js")(app);
require("./app/routes/eagle-flight/badge.route.js")(app);
require("./app/routes/eagle-flight/redeemable.route.js")(app);
require("./app/routes/eagle-flight/document.routes.js")(app);
require("./app/routes/eagle-flight/major.routes.js")(app);

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
const PORT = process.env.PORT || 3013;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
