module.exports = (sequelize, Sequelize) => {
    const Badge = sequelize.define("badge", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imagePath: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
    return Badge;
};