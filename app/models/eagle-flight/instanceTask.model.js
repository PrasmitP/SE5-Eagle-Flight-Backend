module.exports = (sequelize, Sequelize) => {
    const InstanceTask = sequelize.define("instanceTask", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        completionDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        isPostponed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        semesterUntilGraduation: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    },
        { timestamps: false }
    );
    return InstanceTask;
};
