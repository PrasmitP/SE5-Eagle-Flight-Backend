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
        isApproved: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        redeemDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['redeemableId', 'studentUserId']
            }
        ]
    });

    return StudentRedeemable;
};