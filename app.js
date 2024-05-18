import express from "express";
const app = express();

import dotenv from "dotenv";
import router from "./routes/index.js";

// configure custom .env file path
dotenv.config({ path: "./config/config.env" })

// setup body parser
app.use(express.json())

// Importing all routes
app.use('/api/v1', router)

app.use('*',(req, res)=>{
    return res.json({
        status: 404,
        message: "Route not found"
    })
})
app.use((err, req, res, next) => {
    return res.json({
        status: err.status,
        message: err.message
    })
})

export default app