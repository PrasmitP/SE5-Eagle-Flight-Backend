module.exports = (sequelize, Sequelize) => {
    const Submission = sequelize.define("submission", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("pending", "approved", "rejected"),
        },
        description: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        imagePath: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        }
    },
        { timestamps: false }
    );
    return Submission;
};
