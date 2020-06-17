const mongoose = require('mongoose');
const enums = require('../utility');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Student name required"]
    },
    roll: {
        type: Number,
        required:[true, "Roll number required"],
        min: [1, "Not a valid roll number"]
    },
    subject: {
        type: [String],
        enum: enums.subject,
        required: [true, "Subject not provided"]
    },
    branch: {
        type: String,
        // enum:["CSE", "ECE", "ME", "CE", "CH"],
        enum: enums.branch,
        required:[true, "Branch not provided."]
    },
    records: {
        type: [String],
        minLength: 0
    }
});

module.exports = studentSchema;
