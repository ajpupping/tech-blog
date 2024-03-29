const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL, {
        dialect: 'mysql',
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST, 
            dialect: process.env.DB_DIALECT, 
            port: process.env.DB_PORT, 
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