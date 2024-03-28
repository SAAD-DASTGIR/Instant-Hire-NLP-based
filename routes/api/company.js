const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Company = require('../../models/Company')
const config = require('config')


// @route   Post api/company
// @desc    Register company
// @access  Public

router.post('/', [

    check('name','Company Name is required').not().isEmpty(),
    check('email','Please enter a valid email address').isEmail(),
    check('password', "Enter a password with 6 or more characters").isLength({min: 6})

],
async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, password} = req.body

    try{
        // see if company exists
        let company = await Company.findOne({email})
        if (company){
            return res.status(400).json({errors: [{msg: 'Company already exists'}]})
        }

        // get users gravatar
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        company = new Company({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
        }) 

        // encrypt password 
        const salt = await bcrypt.genSalt(10)
        company.password = await bcrypt.hash(password, salt)

        await company.save()

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
