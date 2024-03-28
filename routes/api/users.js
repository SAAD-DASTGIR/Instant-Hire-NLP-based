const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const config = require('config')

// @route   Post api/users
// @desc    Register user
// @access  Public

router.post('/', [

    check('name','Name is required').not().isEmpty(),
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
        // see if user exists
        let user = await User.findOne({email})
        if (user){
            return res.status(400).json({errors: [{msg: 'User already exists'}]})
        }

        // get users gravatar
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
        }) 

        // encrypt password 
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        // return json web token
        const payload = {
            user:{
                id: user.id
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