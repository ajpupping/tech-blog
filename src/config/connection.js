const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.BLOGDB_URL) {
    sequelize = new Sequelize(process.env.BLOGDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
    );
}

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
    console.log(
        'Connection to the database has been established successfully.'
    );
    })
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;