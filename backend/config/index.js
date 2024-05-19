import dotenv from "dotenv";

// Setting up config.env file variables
dotenv.config({ path: './config/config.env' })

const envConfig = {
    db: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        dialect: "mysql"
    },
    jwt: {
        key: process.env.JWT_KEY,
        salt: process.env.SALT
    },
    githubToken: process.env.GITHUB_TOKEN 
}

export default envConfig