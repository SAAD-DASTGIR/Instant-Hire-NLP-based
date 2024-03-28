const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')
const Job = require('../../models/Job')
const Post = require('../../models/Post')
const Company = require('../../models/Company')
const CompanyProfile = require('../../models/CompanyProfile')
const SpamJob = require('../../models/SpamJob')
const SpamPost = require('../../models/SpamPost')
const SpamCompany = require('../../models/SpamCompany')

// @route   POST api/spam/job/:id
// @desc    User mark job as spam
// @access  Private
router.post('/job/:id', auth, async (req, res) => {

    try {
        // Check if the job exists
        const job = await Job.findById(req.params.id)
        if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
        }

        // Check if the user has already marked the job as spam
        const existingSpamJob = await SpamJob.findOne({ 
            user: req.user.id, 
            job: req.params.id
        });
        if (existingSpamJob) {
        return res.status(400).json({ msg: 'You have already marked this job as spam' });
        }

        // Create a new SpamJob instance and save it to the database
        const spamJob = new SpamJob({ 
            user: req.user.id, 
            job: req.params.id,
            companyName: job.company.name,
            title: job.title,
            type: job.type 
        });
        await spamJob.save();

        res.json({ msg: 'Job marked as spam' });

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   POST api/spam/post/:id
// @desc    User mark post as spam
// @access  Private
router.post('/post/:id', auth, async (req, res) => {

    try {
        // Check if the post exists
        const post = await Post.findById(req.params.id)
        if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
        }

        // Check if the user has already marked the post as spam
        const existingSpamPost = await SpamPost.findOne({ user: req.user.id, post: req.params.id });
        if (existingSpamPost) {
        return res.status(400).json({ msg: 'You have already marked this post as spam' });
        }

        // Create a new SpamPost instance and save it to the database
        const spamPost = new SpamPost({ 
            user: req.user.id, 
            post: req.params.id,
            name: post.name,
            avatar: post.avatar,
            text: post.text
        
        });
        await spamPost.save();

        res.json({ msg: 'Post marked as spam' });

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   POST api/spam/company/:id
// @desc    User mark company as spam
// @access  Private
router.post('/company/:id', auth, async (req, res) => {

    try {
        // Check if the company exists
        const company = await Company.findById(req.params.id)
        const companyProfile = await CompanyProfile.findOne({company: req.params.id})
        if (!company) {
        return res.status(404).json({ msg: 'Post not found' })
        }

        // Check if the user has already marked the post as spam
        const existingSpamCompany = await SpamCompany.findOne({ user: req.user.id, company: req.params.id });
        if (existingSpamCompany) {
        return res.status(400).json({ msg: 'You have already marked this Company as spam' });
        }

        // Create a new SpamPost instance and save it to the database
        const spamCompany = new SpamCompany({ 
            user: req.user.id, 
            company: req.params.id,
            name: company.name,
            location: companyProfile.location,
            industry: companyProfile.industry
         });
        await spamCompany.save();

        res.json({ msg: 'Company marked as spam' });

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/spam/companies
// @desc    Get spam companies
// @access  Private
router.get('/companies', adminAuth, async (req, res) => {

    try {
        // Check if the company exists
        const companies = await SpamCompany.find()
        if (!companies) {
        return res.status(404).json({ msg: 'No Companies are marked as spam' })
        }   

        res.json(companies);

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/spam/jobs
// @desc    Get spam jobs
// @access  Private
router.get('/jobs', adminAuth, async (req, res) => {

    try {
        // Check if the company exists
        const jobs = await SpamJob.find()
        if (!jobs) {
        return res.status(404).json({ msg: 'No Jobs are marked as spam' })
        }   

        res.json(jobs); 

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/spam/posts
// @desc    Get spam posts
// @access  Private
router.get('/posts', adminAuth, async (req, res) => {

    try {
        // Check if the company exists
        const posts = await SpamPost.find()
        if (!posts) {
        return res.status(404).json({ msg: 'No Posts are marked as spam' })
        }   

        res.json(posts); 

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/spam/company/:id
// @desc    Remove company from spam
// @access  Private
router.delete('/company/:id', adminAuth, async (req, res) => {

    try {
        // Check if the company exists
        const company = await SpamCompany.findById(req.params.id)
        if (!company) {
        return res.status(404).json({ msg: 'Company is not marked spam' })
        }   

        company.remove()
        res.json({msg: 'Company has been removed from Spam'});

    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Company is not marked spam'})
        }
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/spam/job/:id
// @desc    Remove job from spam
// @access  Private
router.delete('/job/:id', adminAuth, async (req, res) => {

    try {
        // Check if the company exists
        const job = await SpamJob.findById(req.params.id)
        if (!job) {
        return res.status(404).json({ msg: 'Job is not marked spam' })
        }   

        job.remove()
        res.json({msg: 'Job has been removed from Spam'});

    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Job is not marked spam'})
        }
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/spam/post/:id
// @desc    Remove post from spam
// @access  Private
router.delete('/post/:id', adminAuth, async (req, res) => {

    try {
        // Check if the company exists
        const post = await SpamPost.findById(req.params.id)
        if (!post) {
        return res.status(404).json({ msg: 'Post is not marked spam' })
        }   

        post.remove()
        res.json({msg: 'Post has been removed from Spam'});

    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post is not marked spam'})
        }
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router