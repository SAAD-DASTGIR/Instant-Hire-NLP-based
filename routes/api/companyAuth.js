const express = require('express')
const router = express.Router()
const companyAuth = require('../../middleware/companyAuth')
const Company = require('../../models/Company')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const config = require('config')

// @route   GET api/companyAuth
// @desc    get company
// @access  Public

router.get('/', companyAuth, async (req,res)=>{
    try{
        const company = await Company.findById(req.company.id).select('-password')
        res.json(company)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

// @route   Post api/auth
// @desc    Authenticate company and get token
// @access  Public

router.post('/', [

    check('email','Please enter a valid email address').isEmail(),
    check('password', "Enter a password with 6 or more characters").isLength({min: 6}), 
    check('password', "Password is required").exists()

],
async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password} = req.body

    try{
        // see if company exists
        let company = await Company.findOne({email})
        if (!company){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }
        const isMatch = await bcrypt.compare(password, company.password)
        if (!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }

        // return json web token
        const payload = {
            company:{
                id: company.id
            }
        }

        jwt.sign(payload, 
            config.get('jwtSecret'),
            { expiresIn: 3600000 },
            (err,token)=>{
                if(err) throw err
                res.json({token})
            })

    }catch(e){
        console.log(e.message)
        res.status(500).send('server error')
    }

    
})


module.exports = router