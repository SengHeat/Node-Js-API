const sequelize = require('../config/database');
const User = require('./user.model');

const db = { sequelize, User };

// Sync models
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connected');
        await sequelize.sync(); // force: true for dev
    } catch (err) {
        console.error('❌ Unable to connect:', err);
    }
})();

module.exports = db;
