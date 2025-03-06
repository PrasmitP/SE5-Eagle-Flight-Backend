module.exports = (sequelize, Sequelize) => {
    const TaskSemester = sequelize.define("taskSemester", {
        isCompleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        isPostponed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    });
    return Major;
};
