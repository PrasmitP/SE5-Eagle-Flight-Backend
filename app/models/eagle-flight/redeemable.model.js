module.exports = (sequelize, Sequelize) => {
    const Redeemable = sequelize.define("redeemable", {
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
        type: Sequelize.TEXT,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return Redeemable;
  };