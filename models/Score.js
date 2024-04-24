const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ScoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Change to ObjectId
        ref: 'User' // Assuming you have a User model
    },
    job: {
        type: Schema.Types.ObjectId, // Change to ObjectId
        ref: 'Job' // Assuming you have a Job model
    },
    score: {
        type: Number,
        default:null
        
    },
    email:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Score = mongoose.model('score', ScoreSchema)