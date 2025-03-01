import { db_name } from "../constant.js";
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${db_name}`);
        console.log("Database connected successfully. ", connectionInstance.connection.host);
        
    } catch (error) {
        console.error("Error connecting to database: ", error.message);
        exit(1);
    }
}

export default connectDb;