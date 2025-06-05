module.exports = (sequelize, Sequelize) => {
    const StudentEvent = sequelize.define("studentEvent", {
      id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      studentUserID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        //primaryKey: true
      },
      studentOCID: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
      timestamps: true
    });
  
    return StudentEvent;
  };  