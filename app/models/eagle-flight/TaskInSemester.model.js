module.exports = (sequelize, Sequelize) => {
    const TaskInSemester = sequelize.define("taskInSemester", {
        semesterUntilGraduation: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    },
        { timestamps: false }
    );
    return TaskInSemester;
};
