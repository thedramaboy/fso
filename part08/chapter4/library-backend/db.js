const mongoose = require('mongoose')

const connectToDatabase = async (uri) => {
    console.log("Connecting to database...")

    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connection to database", error.message)
        process.exit(1)
    }
}

module.exports = connectToDatabase