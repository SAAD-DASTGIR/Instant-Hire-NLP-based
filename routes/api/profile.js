const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

// const { ValidatorsImpl } = require('express-validator/src/chain')



// @route   GET api/profile/me
// @desc    get current user profile
// @access  private

router.get('/me', auth, async (req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({msg: 'No profile found for the current user'})
        }

        res.json(profile)

    } catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/:edit
// @desc    Create or Update User Profile
// @access  private

router.post('/:edit', [auth,  [
    check('status','Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
    check('qualification', 'Qualification is required').not().isEmpty(),
    check('field', 'Field of study is required').not().isEmpty()
]],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const {
        company,
        website, 
        location,
        bio,
        status,
        qualification,
        field,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    //Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if(company) {profileFields.company = company}
    if(website) {profileFields.website = website}
    if (location) {profileFields.location = location}
    if (field) {profileFields.field = field}
    if (qualification) {profileFields.qualification = qualification}
    if (bio) {profileFields.bio = bio}
    if (status) {profileFields.status = status}
    if (githubusername) {profileFields.githubusername = githubusername}
    if ( skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    //build social object
    profileFields.social ={}
    if (youtube) {profileFields.social.youtube = youtube}
    if (twitter) {profileFields.social.twitter = twitter}
    if (facebook) {profileFields.social.facebook = facebook}
    if (linkedin) {profileFields.social.linkedin = linkedin}
    if (instagram) {profileFields.social.instagram = instagram}

    try{
        let profile = Profile.findOne({user: req.user.id})
        
        if(req.params.edit == 1){
            //update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
                )

            return res.json(profile)
        }
        // create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
    
})


// @route   GET api/profile
// @desc    get all user profiles
// @access  public

router.get('/', async(req,res)=>{
    try {
        let profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// @route   GET api/profile/user/:user_id
// @desc    get single user profile
// @access  public

router.get('/user/:user_id', async(req,res)=>{
    try {
        let profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])

        if(!profile) return res.status(400).json({msg: 'Profile not found'})
        res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'}  )
        }
        res.status(500).send('Server Error')
        
    }
})


// @route   DELETE api/profile/
// @desc    delete user profile, user and posts
// @access  private

router.delete('/', auth, async(req,res)=>{

    
    try {
        //remove posts
        await Post.deleteMany({ user: req.user.id })

        //remove profile
        await Profile.findOneAndRemove({user: req.user.id})

        //remove user
        await User.findOneAndRemove({_id: req.user.id})

        res.json({msg: 'User deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   PUT api/profile/experience
// @desc    add profile experience
// @access  private

router.put('/experience', [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company name is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
        
    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.experience.unshift(newExp)

        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  private

router.delete('/experience/:exp_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id})

        //Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   PUT api/profile/education
// @desc    add profile education
// @access  private

router.put('/education', [auth, [
    check('school', 'School name is required').not().isEmpty(),
    check('degree', 'Degree name is required').not().isEmpty(),
    check('fieldofstudy', 'field of study is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty()
]], async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors: errors.array()})
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
        
    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.education.unshift(newEdu)

        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   DELETE api/profile/education/:edu_id
// @desc    delete education from profile
// @access  private

router.delete('/education/:edu_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id})

        //Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id)
        profile.education.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Route: GET /profiles/search?skills=<comma-separated-skills>
// Description: Search profiles based on skills
router.get('/search', async (req, res) => {
    try {
      const { skills } = req.query;
      const searchSkills = skills.split(',').map(skill => skill.trim());
  
      // Find profiles that match the provided skills
      const profiles = await Profile.find({ skills: { $in: searchSkills } }).populate('user',['name','avatar']);
  
      res.json(profiles);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

module.exports = router