
import mongoose from "mongoose"

export type ConnectionObject = {
    isConnected?: number
}
const connection: ConnectionObject = {};


async function DbConnect(): Promise<void> {
    try {
        if (connection.isConnected) {
            console.log("Already connected");
            return;
        }

        const db = await mongoose.connect(process.env.MONGO_URI || "", {})
        connection.isConnected = db.connections[0].readyState
        console.log("dB is connected");
    } catch (error) {
        console.log("Error while connecting db", error);

    }

}
export default DbConnect;