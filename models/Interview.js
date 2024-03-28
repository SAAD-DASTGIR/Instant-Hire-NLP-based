const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InterviewSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    meetingId: {
        type: String
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
  }
});

module.exports = Interview = mongoose.model('interview', InterviewSchema)
