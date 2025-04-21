module.exports = (sequelize, Sequelize) => {
    const StudentRedeemable = sequelize.define("studentRedeemable", {
        redeemableId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'redeemables',
                key: 'id'
            }
        },
        studentUserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'userId'
            }
        },
        redeemDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    return StudentRedeemable;
};
