const { MongoClient } = require("mongodb")

let db = null
let client = null

const connectDB = async () => {
  try {
    if (db) {
      return db
    }

    const mongoURI = process.env.MONGODB_URI
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables")
    }

    client = new MongoClient(mongoURI)
    await client.connect()

    db = client.db("ds_lab_portfolio")
    console.log("Connected to MongoDB successfully")

    return db
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.")
  }
  return db
}

const closeDB = async () => {
  if (client) {
    await client.close()
    db = null
    client = null
    console.log("MongoDB connection closed")
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB,
}
