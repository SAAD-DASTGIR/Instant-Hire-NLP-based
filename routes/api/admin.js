// const express = require('express')
// const router = express.Router()
// const adminAuth = require('../../middleware/adminAuth')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const {check, validationResult} = require('express-validator')
// const config = require('config')
// const Admin = require('../../models/Admin')


// // @route   GET api/admin
// // @desc    Test router
// // @access  private

// router.get('/', adminAuth, async (req,res)=>{
//     try{
//         const admin = await Admin.findById(req.admin.id).select('-password')
//         res.json(admin)
//     }catch(err){
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// })

// // @route   Post api/admin
// // @desc    Register admin
// // @access  private

// // router.post('/', adminAuth, [

// //     check('email','Please enter a valid email address').isEmail(),
// //     check('password', "Enter a password with 6 or more characters").isLength({min: 6})

// // ],
// // async (req,res)=>{
// //     const errors = validationResult(req)
// //     if (!errors.isEmpty()){
// //         return res.status(400).json({ errors: errors.array() })
// //     }

// //     const { email, password} = req.body

// //     try{
// //         // see if user exists
// //         let admin = await Admin.findOne({email})
// //         if (admin){
// //             return res.status(400).json({errors: [{msg: 'Admin already exists'}]})
// //         }

// //         admin = new Admin({
// //             email: req.body.email,
// //             password: req.body.password
// //         }) 

// //         // encrypt password 
// //         const salt = await bcrypt.genSalt(10)
// //         admin.password = await bcrypt.hash(password, salt)

// //         await admin.save()

// //         // return json web token
// //         const payload = {
// //             admin:{
// //                 id: admin.id
// //             }
// //         }

// //         jwt.sign(payload, 
// //             config.get('jwtSecret'),
// //             { expiresIn: 3600000 },
// //             (err,token)=>{
// //                 if(err) throw err
// //                 res.json({token})
// //             })

// //     }catch(e){
// //         console.log(e.message)
// //         res.status(500).send('server error')
// //     }

    
// // })

// router.post('/', validateAdminCreation, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         // Check if admin already exists
//         let admin = await Admin.findOne({ email });
//         if (admin) {
//             return res.status(400).json({ errors: [{ msg: 'Admin already exists' }] });
//         }

//         // Create a new admin user
//         admin = new Admin({
//             email,
//             password // Assuming you will hash the password before saving to the database
//         });

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         admin.password = await bcrypt.hash(password, salt);

//         // Save the admin user to the database
//         await admin.save();

//         // Return a success message
//         res.status(200).json({ msg: 'Admin user created successfully' });
//     } catch (error) {
//         console.error('Error creating admin user:', error);
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// // @route   Post api/auth
// // @desc    Authenticate admin and get token
// // @access  Public

// router.post('/login', [

//     check('email','Please enter a valid email address').isEmail(),
//     check('password', "Enter a password with 6 or more characters").isLength({min: 6}), 
//     check('password', "Password is required").exists()

// ],
// async (req,res)=>{
//     const errors = validationResult(req)
//     if (!errors.isEmpty()){
//         return res.status(400).json({ errors: errors.array() })
//     }

//     const {email, password} = req.body

//     try{
//         // see if user exists
//         let admin = await Admin.findOne({email})
//         if (!admin){
//             return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
//         }
//         const isMatch = await bcrypt.compare(password, admin.password)
//         if (!isMatch){
//             return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
//         }

//         // return json web token
//         const payload = {
//             admin:{
//                 id: admin.id
//             }
//         }

//         jwt.sign(payload, 
//             config.get('jwtSecret'),
//             { expiresIn: 3600000 },
//             (err,token)=>{
//                 if(err) throw err
//                 res.json({token})
//             })

//     }catch(e){
//         console.log(e.message)
//         res.status(500).send('server error')
//     }

    
// })


// module.exports = router

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const Admin = require('../../models/Admin');
router.get('/',async (req,res)=>{
    try{
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
});
// Define validation middleware for creating admin user
const validateAdminCreation = [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password is required').exists(),
    check('password', 'Enter a password with 6 or more characters').isLength({ min: 6 }),
];

// Route for creating admin user
router.post('/', validateAdminCreation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ errors: [{ msg: 'Admin already exists' }] });
        }

        // Create a new admin user
        admin = new Admin({
            email,
            password // Assuming you will hash the password before saving to the database
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        // Save the admin user to the database
        await admin.save();

        // Return a success message
        res.status(200).json({ msg: 'Admin user created successfully' });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route for authenticating admin and generating token
router.post('/login', [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password is required').exists(),
    check('password', 'Enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // Return JSON Web Token
        const payload = {
            admin: {
                id: admin.id
            }
        };

        jwt.sign(payload,
            config.get('jwtSecret'),
            { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

