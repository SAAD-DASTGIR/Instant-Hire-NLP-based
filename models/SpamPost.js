const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SpamPostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    text:{
        type: String
    }
})


module.exports = SpamPost = mongoose.model('spam_post', SpamPostSchema)

