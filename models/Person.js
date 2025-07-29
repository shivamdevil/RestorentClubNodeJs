const mongoose = require('mongoose')

//Define the person Schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    addresss: {
        type: String

    },
    salary: {
        type: Number,
        required: true
    }


})

//Create Person Model 
const person = mongoose.model('person', personSchema);
module.exports = person;