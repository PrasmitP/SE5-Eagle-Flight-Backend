module.exports = (sequelize, Sequelize) => {
    const Strength = sequelize.define("strength", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return Strength;
};
