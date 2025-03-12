const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./eagle-flight/user.model.js")(sequelize, Sequelize);
db.student = require("./eagle-flight/student.model.js")(sequelize, Sequelize);

db.role = require("./eagle-flight/role.model.js")(sequelize, Sequelize);
db.major = require("./eagle-flight/major.model.js")(sequelize, Sequelize);
db.strength = require("./eagle-flight/strength.model.js")(sequelize, Sequelize);

db.plan = require("./eagle-flight/plan.model.js")(sequelize, Sequelize);
db.generalSemester = require("./eagle-flight/generalSemester.model.js")(sequelize, Sequelize);
db.semester = require("./eagle-flight/semester.model.js")(sequelize, Sequelize);
db.taskSemester = require("./eagle-flight/taskSemester.model.js")(sequelize, Sequelize);
db.task = require("./eagle-flight/task.model.js")(sequelize, Sequelize);
db.session = require("./eagle-flight/session.model.js")(sequelize, Sequelize);


// db.user = require("./resume-builder/user.model.js")(sequelize, Sequelize);
// db.session = require("./resume-builder/session.model.js")(sequelize, Sequelize);
// db.resume = require("./resume-builder/resume.model.js")(sequelize, Sequelize);
// db.skill = require("./resume-builder/skill.model.js")(sequelize, Sequelize);
// db.experience = require("./resume-builder/experience.model.js")(sequelize, Sequelize);
// db.education = require("./resume-builder/education.model.js")(sequelize, Sequelize);
// db.project = require("./resume-builder/project.model.js")(sequelize, Sequelize);
// db.comment = require("./resume-builder/comment.model.js")(sequelize, Sequelize);
// db.award = require("./resume-builder/award.model.js")(sequelize, Sequelize);

// Bring back resume-builder stuff once we are done with the basics

// Associations for User
db.role.hasMany(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "SET NULL" }
)
db.user.belongsTo(
  db.role,
  { as: "role" },
  { foreignKey: { allowNull: false }, onDelete: "SET NULL" }
)
db.user.hasOne(
  db.student,
  {
    foreignKey: {
      name: "userId",
      allowNull: false,
      onDelete: "CASCADE",
      primaryKey: true
    }
  }
)
db.student.belongsTo(
  db.user,
  { as: "user" },
)

// Associations for Student
db.major.hasMany(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "SET NULL" }
)
db.student.belongsTo(
  db.major,
  { as: "major" },
  { foreignKey: { allowNull: false }, onDelete: "SET NULL" }
)
db.strength.hasMany(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "SET NULL" }
)
db.student.belongsTo(
  db.strength,
  { as: "strength" },
  { foreignKey: { allowNull: false }, onDelete: "SET NULL" }
)

// Associations for Flight Plan
// sequelize.sync({ alter: true }) // Safely updates tables without deleting data NOT SURE ABOUT THIS ONE

db.plan.hasMany(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)
db.semester.belongsTo(
  db.plan,
  { as: "plan" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)


db.generalSemester.hasMany(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)
db.semester.belongsTo(
  db.generalSemester,
  { as: "generalSemester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)

db.semester.belongsToMany(
  db.task,
  {
    as: "task",
    through: db.taskSemester,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
)
db.task.belongsToMany(
  db.semester,
  {
    as: "semester",
    through: db.taskSemester,
    foreignKey: { allowNull: false }, onDelete: "CASCADE"
  }
)


module.exports = db;
