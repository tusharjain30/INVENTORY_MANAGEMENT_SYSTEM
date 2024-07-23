import mongoose from "mongoose";

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "INVENTORY_MANAGEMENT_SYSTEM"
    })

    if (connection.STATES.connecting) {
        console.log("Database is connecting")
    }

    if (connection.STATES.connected) {
        console.log("Database is connected")
    }
}

export default connectDB;