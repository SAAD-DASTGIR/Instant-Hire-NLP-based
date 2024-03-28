const mongoose = require('mongoose');

// Create Schema
const CompanyProfileSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  headcount: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CompanyProfile = mongoose.model('companyProfile', CompanyProfileSchema);
