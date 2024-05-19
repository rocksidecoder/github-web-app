import { Sequelize } from 'sequelize'

import config from './index.js';
const { database, username, password, host, dialect } = config.db;


// Intializing the database connection
export const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true, // soft delete the records
        underscored: true
    }
})

// Connecting to database
export const connectDatabase = async() => {
    sequelize.authenticate()
        .then(() => {
            console.log("Database connect successfully...")
        }).catch((err) => {
            console.log("Error in database connection :: \n", err.message)
            process.exit(1)
        })
}

