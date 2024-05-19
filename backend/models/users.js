import { DataTypes, Model } from "sequelize"
import bcrypt from "bcryptjs"

// import { sequelize } from '../utils/database.js';

import envConfig from '../config/index.js';
const { jwt } = envConfig

export default (sequelize) => {

    class Users extends Model { }

    Users.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "users",
        modelName: "Users"
    })

    Users.beforeCreate(async (user) => {
        user.password = await user.hasPassword(user.password)
    })

    // Hashing the password before create the user
    Users.prototype.hasPassword = async function (password) {
        const hashPassword = await bcrypt.hash(password, parseInt(jwt.salt));
        return hashPassword;
    }
    
    return Users
}
