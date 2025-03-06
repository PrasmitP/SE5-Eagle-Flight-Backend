module.exports = (sequelize, Sequelize) => {
    const Major = sequelize.define("major", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
    return Major;
};
