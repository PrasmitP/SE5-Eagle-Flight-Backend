module.exports = (sequelize, Sequelize) => {
    const StudentBadge = sequelize.define('studentBadge', {
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        badgeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        }
        }, {
        tableName: 'studentBadges',
        timestamps: false
        });
    return StudentBadge;
};