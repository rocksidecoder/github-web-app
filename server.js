import app from "./app.js";

import { connectDatabase } from "./config/database.js";
// Connecting to database
connectDatabase()

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`)
})