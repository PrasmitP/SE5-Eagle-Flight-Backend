module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        ocId: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
