module.exports = (sequelize, Sequelize) => {
  const Plan = sequelize.define("plan", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
    { timestamps: false }
  );
  return Plan;
};
