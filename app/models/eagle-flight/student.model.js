module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        userId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ocId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        enrollmentYear: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        points: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Student;
};
