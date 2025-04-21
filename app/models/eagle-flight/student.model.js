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
        enrollmentSemester: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        graduationYear: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        graduationSemester: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        points: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
        { timestamps: false }
    );
    return Student;
};
