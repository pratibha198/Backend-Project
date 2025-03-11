import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{})
        // console.log(connectionInstance.connection.host);

       

        console.log(`\n MongoDb connected !! DB host : 
        ${connectionInstance.connection.host}`);
    } catch (error) {
        // console.log("MongoDB connection error khkhk :", error);
        console.log("MongoDB connection erroooooor:", error.message);
        process.exit(1)
    }
}
export default connectDB