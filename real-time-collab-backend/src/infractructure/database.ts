import dotenv from "dotenv";
const mongoose = require("mongoose");
// import mongoose from "mongoose"

const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}

const connectDB = async () => {
    try {
        const dbPswd = process.env.DB_PSWD;
        const dbUser = process.env.DB_USER;
        const dbHost = process.env.DB_HOST;
        const DB = process.env.DATABSE
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPswd}@${dbHost}/${DB}?retryWrites=true&w=majority&appName=COLLAB`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Mongo db connected');
    } catch (error) {
        console.error('Mongodb Connection error', error);
        process.exit(1);
    }
}

export default connectDB