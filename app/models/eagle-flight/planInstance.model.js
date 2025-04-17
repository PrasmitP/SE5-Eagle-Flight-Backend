module.exports = (sequelize, Sequelize) => {
    const PlanInstance = sequelize.define("planInstance", {
        studentUserId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        planId: {
            type: Sequelize.INTEGER,
        },
    },
        { timestamps: false }
    );
    return PlanInstance;
};
