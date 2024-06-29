import mongoose from "mongoose";
export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("Connected to MongoDB successfully");
        });

        connection.on('error', (error) => {
            console.error("Error connecting to MongoDB: ", error);
            process.exit();
        });
    }
    catch(error){
        console.error("Something went wrong: ", error);
    }
}