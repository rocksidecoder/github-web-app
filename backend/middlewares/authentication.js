import jwt from "jsonwebtoken";
import config from "../config/index.js";
import models from '../models/index.js'

const { Users } = models;
const secretKey = config.jwt.key;

// Authentication user
const isAuth = async(req, res, next) => {
    try {
        // check header exists or not
        if(!req.headers?.authorization?.startsWith("Bearer")){
            return res.json({
                status: 403,
                message: "Missing Authorization header with bearer token"
            })
        }

        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.json({
                status: 403,
                message: "Authentication Failed"
            })
        }

        // verify the token
        const decoded = jwt.verify(token, secretKey);

        // check user exists or not
        const user = await Users.findByPk(decoded.id)
        if(!user){
            return res.json({
                status: 404,
                message: "User authentication failed"
            })
        }

        req.user = user
        return next()
    } catch (error) {
        next(error)
    }
}

export default isAuth