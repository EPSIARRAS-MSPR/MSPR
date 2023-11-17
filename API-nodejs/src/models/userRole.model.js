const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../config/database.config');

class UserRole extends Model { };

UserRole.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'userRole',
    tableName: 'users_roles'
});

module.exports = UserRole;