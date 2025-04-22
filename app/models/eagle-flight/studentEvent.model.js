module.exports = (sequelize, Sequelize) => {
    const StudentEvent = sequelize.define("studentEvent", {
      studentUserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      eventID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      reflection: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    }, {
      timestamps: true
    });
  
    return StudentEvent;
  };  