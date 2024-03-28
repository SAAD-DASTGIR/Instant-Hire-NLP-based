const mongoose = require('mongoose');

// Create Schema
const ResumeSchema = new mongoose.Schema({
    pdf: {
        data: Buffer,
        contentType: String
    },
    email: {
        type: [String]
    },
    phoneNumber: {
        type: [String]
    },
    name: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    qualification: {
        type: [String]
    },
    institutes: {
        type: [String]
    },
    experience: {
        type: [String]
    }
});

module.exports = Resume = mongoose.model('resume', ResumeSchema);
