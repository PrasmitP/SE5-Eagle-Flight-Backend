module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("event", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dateTime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        experienceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return Task;
};
