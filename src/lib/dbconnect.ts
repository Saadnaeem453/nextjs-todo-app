import mongoose, { Connection } from 'mongoose';

export type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    try {
        if (connection.isConnected) {
            console.log("Already connected");
            return;
        }

        const db = await mongoose.connect(process.env.MONGODB_URI as string, {
        });

        connection.isConnected = db.connections[0].readyState;
        console.log("Database is connected");
    } catch (error) {
        console.error("Error while connecting to the database", error);
    }
}

export default dbConnect;
