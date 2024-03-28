const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const config = require('config')

// @route   GET api/auth
// @desc    Get user
// @access  private

router.get('/', auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

// @route   Post api/auth
// @desc    Authenticate user and get token
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
        // see if user exists
        let user = await User.findOne({email})
        if (!user){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
        }

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