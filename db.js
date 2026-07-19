// db.js
const { MongoClient } = require('mongodb');
const dns = require('dns');
require('dotenv').config();

// Set Google DNS servers for lookups (mirrors seed.js)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@webapi.n4vrktr.mongodb.net/?appName=WEBAPI`;

const client = new MongoClient(uri);
let db = null;

/**
 * Opens the MongoDB connection (call once, at server startup).
 */
async function connectDB() {
    if (db) return db;

    await client.connect();
    db = client.db('tuk_tuk_db');
    console.log('✅ Connected to MongoDB (tuk_tuk_db)');
    return db;
}

/**
 * Returns the active db handle. Throws if connectDB() hasn't run yet,
 * so a route can never silently query a null connection.
 */
function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB() before handling requests.');
    }
    return db;
}

/**
 * Looks up a vehicle's GPS device id.
 */
async function getDeviceKey(vehicleId) {
    const database = getDB();
    const vehicle = await database.collection('vehicles').findOne({ id: Number(vehicleId) });
    return vehicle ? vehicle.device_id : null;
}

module.exports = { connectDB, getDB, getDeviceKey };