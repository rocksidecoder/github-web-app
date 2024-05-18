import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';
import models from '../models/index.js'

const { Users } = models;
const secretKey = config.jwt.key

// Register new user    =>  /api/v1/register
export const registerUser = async (req, res, next) => {
    try {
        const { body } = req;

        // validate body
        if(!body?.username || !body?.password){
            return res.json({
                status: 422,
                message: "Please provide username and password"
            })
        }

        // create user
        const result = await Users.create(body);

        return res.json({
            status: 201,
            message: "User register successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// login user    =>  /api/v1/login
export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // check users exxists or not 
        const user = await Users.findOne({ where: { username } });
        if (!user) throw new Error("Invalid Username!")

        // validate user password
        const validatePassword = await bcrypt.compare(password,user.password);
        if (!validatePassword) throw new Error("Invalid Password!")

        // generate jwt token
        const payload = { id: user.id, username: user.usernamme }
        user.token = jwt.sign(payload, secretKey, { expiresIn: "24h" })

        return res.json({
            status: 200,
            message: "Login successfully",
            data: user.token
        })
    } catch (error) {
        next(error)
    }
}