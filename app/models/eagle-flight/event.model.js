module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        experienceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true,
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
        }
    });
    return Event;
};
