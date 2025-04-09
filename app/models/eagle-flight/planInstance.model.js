module.exports = (sequelize, Sequelize) => {
    const PlanInstance = sequelize.define("planInstance", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
        { timestamps: false }
    );
    return PlanInstance;
};
