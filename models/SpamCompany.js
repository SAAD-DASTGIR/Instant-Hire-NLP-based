const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SpamCompanySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    name:{
        type: String
    },
    location:{
        type: String
    },
    industry:{
        type: String
    }
})


module.exports = SpamCompany = mongoose.model('spam_company', SpamCompanySchema)

