const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SpamJobSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    job:{
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    },
    companyName:{
        type: String
    },
    title:{
        type: String
    },
    type:{
        type: String
    }
})


module.exports = SpamJob = mongoose.model('spam_job', SpamJobSchema)

