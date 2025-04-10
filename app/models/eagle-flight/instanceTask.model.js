module.exports = (sequelize, Sequelize) => {
    const InstanceTask = sequelize.define("instanceTask", {
        completionDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        isPostponed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    },
        { timestamps: false }
    );
    return InstanceTask;
};
