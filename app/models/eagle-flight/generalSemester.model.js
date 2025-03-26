module.exports = (sequelize, Sequelize) => {
    const GeneralSemester = sequelize.define("gerneralsemester", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        startDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        season: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return GeneralSemester;
};
