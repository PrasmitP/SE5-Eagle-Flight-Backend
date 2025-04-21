const { DataTypes } = require("sequelize");
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
db.session = require("./eagle-flight/session.model.js")(sequelize, Sequelize);

db.role = require("./eagle-flight/role.model.js")(sequelize, Sequelize);
db.major = require("./eagle-flight/major.model.js")(sequelize, Sequelize);
db.strength = require("./eagle-flight/strength.model.js")(sequelize, Sequelize);

db.plan = require("./eagle-flight/plan.model.js")(sequelize, Sequelize);
db.taskInSemester = require("./eagle-flight/TaskInSemester.model.js")(sequelize, Sequelize);
db.task = require("./eagle-flight/task.model.js")(sequelize, Sequelize);


db.redeemable = require("./eagle-flight/redeemable.model.js")(sequelize, Sequelize);
db.studentRedeemable = require("./eagle-flight/studentRedeemable.model.js")(sequelize, Sequelize);


db.planInstance = require("./eagle-flight/planInstance.model.js")(sequelize, Sequelize);
db.instanceTask = require("./eagle-flight/instanceTask.model.js")(sequelize, Sequelize);
db.generalSemester = require("./eagle-flight/generalSemester.model.js")(sequelize, Sequelize);

db.badge = require('./eagle-flight/badge.model.js')(sequelize, Sequelize);
//db.studentBadge = require('./eagle-flight/studentBadge.model.js')(sequelize, Sequelize);

db.redeemable = require('./eagle-flight/redeemable.model.js')(sequelize, Sequelize);
//db.studentRedeemable = require('./eagle-flight/studentRedeemable.model.js')(sequelize, Sequelize);

db.event = require("./eagle-flight/event.model.js")(sequelize, Sequelize);

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
db.badge.belongsToMany(
  db.student,
  {
    through: "studentBadges",
    foreignKey: 'badgeId',
    otherKey: 'studentId',
    onDelete: "CASCADE"
  }
)
db.redeemable.belongsToMany(
  db.student,
  {
    through: "studentRedeemables",
    foreignKey: "redeemableId",
    otherKey: "studentId",
    onDelete: "CASCADE"
  }
)

// Associations for Events
db.event.belongsToMany(
  db.student,
  {
    as: "student",
    through: "studentEvent",
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  }
)
db.student.belongsToMany(
  db.event, {
  as: "event",
  through: "studentEvent",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
}
)

// Associations for Flight Plan

db.plan.hasMany(db.major);
db.major.belongsTo(db.plan);
db.plan.belongsToMany(db.task, { through: db.taskInSemester });
db.task.belongsToMany(db.plan, { through: db.taskInSemester });


// Assosiations for Flight Plan Instance

db.student.hasOne(db.planInstance);
db.planInstance.belongsTo(db.student);

db.plan.hasMany(db.planInstance);
db.planInstance.belongsTo(db.plan);

// Many-to-Many through instanceTask
// This is because we do want to have duplicate rows, with different semesterUntilGraduation. Tasks can be postponed!
db.planInstance.hasMany(db.instanceTask, {
  foreignKey: 'planInstanceStudentUserId'
});
db.instanceTask.belongsTo(db.planInstance, {
  foreignKey: 'planInstanceStudentUserId'
});

// A Task has many InstanceTasks
db.task.hasMany(db.instanceTask, {
  foreignKey: 'taskId',
  onDelete: 'CASCADE',
});

db.instanceTask.belongsTo(db.task, {
  foreignKey: 'taskId',
  onDelete: 'CASCADE',
});


// General semester associations
// db.generalSemester.hasMany(db.instanceTask);
// db.instanceTask.belongsTo(db.generalSemester);

//Assosiations for redeemable 

// A Student can redeem many items
db.student.hasMany(
  db.studentRedeemable,
  { as: "studentRedeemable" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentRedeemable.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)

// db.generalSemester.hasMany(
//   db.semester,
//   { as: "semester" },
// );

// A Redeemable item can be redeemed many times
db.redeemable.hasMany(
  db.studentRedeemable,
  { as: "studentRedeemable" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentRedeemable.belongsTo(
  db.redeemable,
  { as: "redeemable" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
module.exports = db;