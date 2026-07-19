// seed.js - INSERT DATA VIA SEED.JSON
const { MongoClient } = require('mongodb');
const fs = require('fs');
const dns = require('dns');
require('dotenv').config()
const cors = require('cors')


// Set Google DNS servers for this script's lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function seed() {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@webapi.n4vrktr.mongodb.net/?appName=WEBAPI`);
  try {
    await client.connect();
    const db = client.db('tuk_tuk_db');

    const data = JSON.parse(fs.readFileSync('./seed.json', 'utf-8'));

    for (const [collectionName, documents] of Object.entries(data)) {
      const collection = db.collection(collectionName);
      await collection.deleteMany({}); // optional: clear old data first
      const result = await collection.insertMany(documents);
      console.log(`✅ ${collectionName}: inserted ${result.insertedCount} documents`);
    }
  } finally {
    await client.close();
  }
}

seed().catch(console.error);