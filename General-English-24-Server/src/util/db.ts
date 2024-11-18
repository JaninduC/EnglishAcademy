import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://learningUser:5By4UG3SO@13.234.231.2:27017/learning-platform?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB connection URI
const dbName = 'learning-platform'; // Database name
let dbInstance: Db | null = null; // Singleton instance

/**
 * Connects to MongoDB and returns the database instance.
 * Ensures only a single instance is created and reused globally.
 */
export const connectToDatabase = async (): Promise<Db> => {
    if (dbInstance) {
        console.log('Reusing existing MongoDB connection');
        return dbInstance; // Return existing instance if already connected
    }

    try {
        const client = new MongoClient(uri); // No need for useUnifiedTopology
        await client.connect(); // Connect to the MongoDB server
        console.log('Connected to MongoDB');
        dbInstance = client.db(dbName); // Use the specified database
        return dbInstance;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Throw the error for proper handling
    }
};
