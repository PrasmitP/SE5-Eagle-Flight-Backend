module.exports = (sequelize, Sequelize) => {
  const Plan = sequelize.define("plan", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  },
    { timestamps: false }
  );
  return Plan;
};
