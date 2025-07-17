const { DataTypes } = require('sequelize');
const sequelize = require('../../src/config/database');

const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'users',           // ✅ use "users" not "Users"
        underscored: true,            // ✅ converts timestamps to snake_case
        timestamps: true              // ✅ auto add created_at and updated_at
    });

module.exports = User;
