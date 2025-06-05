const db = require("../../models");
const User = db.user;
const Student = db.student;
const PlanInstance = db.planInstance;
const InstanceTask = db.instanceTask;
const Task = db.task;

exports.findAllWithProgress = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Student,
          include: [
            {
              model: PlanInstance,
              include: [
                {
                  model: InstanceTask,
                  include: [Task]
                }
              ]
            }
          ]
        },
        { model: db.role, as: "role" }
      ],
      order: [["lName", "ASC"]],
    });

    const result = users.map(user => {
      const student = user.student;
      let totalTasks = 0;
      let completedTasks = 0;

      if (student?.planInstance?.instanceTasks?.length > 0) {
        totalTasks = student.planInstance.instanceTasks.length;
        completedTasks = student.planInstance.instanceTasks.filter(t => t.completed).length;
      }

      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        id: user.id,
        ocId: student?.ocId || null,
        fName: user.fName,
        lName: user.lName,
        roleId: user.roleId,
        roleName: user.role?.name || "Unknown",
        progress: progress
      };
    });

    res.status(200).send(result);
  } catch (err) {
    console.error("Error fetching user flight plan data:", err);
    res.status(500).send({ message: "Failed to retrieve user flight plan data." });
  }
};