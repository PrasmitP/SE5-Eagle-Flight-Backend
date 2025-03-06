// Document Model (document.model.js)
module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("document", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uploadedBy: {
        type: Sequelize.INTEGER, // Links to a student ID
        allowNull: false,
      },
    });
  
    // Define associations
    Document.associate = (models) => {
      Document.belongsTo(models.student, {
        foreignKey: "uploadedBy",
        as: "student",
        onDelete: "CASCADE",
      });
    };
 
    return Document;
};
  