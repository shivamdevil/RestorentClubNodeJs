const mongoose = require('mongoose')
require('dotenv').config();

// Define the MongoDB connections URl

// const mongoURL = ''
const mongoURl = process.env.MONGODB_URL;


mongoose.connect(mongoURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//Get Default connection
//Mongoose maintain a default connection object representing the mongoDB connections......
const db = mongoose.connection;

//Define event listeners for database connections
db.on('connected', () => {
    console.log('Connections to MongoDb server');

})

db.on('error', (err) => {
    console.log('MongoDb connections error:', err);

})

db.on('disconnected', () => {
    console.log('MongoDB Disconnected');

})

//Export the data base connections
module.exports = db;