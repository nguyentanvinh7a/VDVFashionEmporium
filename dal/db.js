const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://nguyentanvinh7a:01685698193@cluster0.ebrk4.mongodb.net/test";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb(){
    await client.connect();
    // Establish and verify connection
    database = await client.db("store");
    console.log('Db connected!');
}

console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;