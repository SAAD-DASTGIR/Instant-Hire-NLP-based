const express = require('express');
const router = express.Router();
const companyAuth = require('../../middleware/companyAuth')
const auth = require('../../middleware/auth')
const adminAuth = require('../../middleware/adminAuth')
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const Job = require('../../models/Job')
const Profile = require('../../models/Profile');
const SpamJob = require('../../models/SpamJob');


// @route   POST api/jobs
// @desc    Post a new job
// @access  Private
router.post('/', [companyAuth, [
  check('title', 'Enter Job title').not().isEmpty(),
  check('description', 'Enter Job description').not().isEmpty(),
  check('requiredSkills', 'Enter required Skills to post job').not().isEmpty(),
  check('requiredSkills', 'Enter required Skills to post job').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
      const {
          company,
          title,
          location,
          description,
          type,
          gender,
          qualification,
          requiredSkills,
          salaryFrom,
          salaryTo,
          positions
      } = req.body;

      // Check if a job with the same title has already been posted by this company
      const existingJob = await Job.findOne({ company: req.company.id, title: title });
      if (existingJob) {
          return res.status(400).json({ errors: [{ msg: 'A job with the same title has already been posted.' }] });
      }

      const newJob = new Job({
          company,
          title,
          location,
          description,
          type,
          gender,
          qualification,
          requiredSkills,
          salaryFrom,
          salaryTo,
          positions
      });
      newJob.company = req.company.id;

      const savedJob = await newJob.save();

      res.json(savedJob);

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});


// @route   PUT api/jobs/:job_id
// @desc    Edit an existing job
// @access  Private
router.put('/:id', companyAuth, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      // Check if the user owns the job post
      if (job.company.toString() !== req.company.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      job.title = req.body.title || job.title;
      job.location = req.body.location || job.location;
      job.description = req.body.description || job.description;
      job.type = req.body.type || job.type;
      job.gender = req.body.gender || job.gender;
      job.qualification = req.body.qualification || job.qualification;
      job.requiredSkills = req.body.requiredSkills || job.requiredSkills;
      job.salaryFrom = req.body.salaryFrom || job.salaryFrom;
      job.salaryTo = req.body.salaryTo || job.salaryTo;
      job.positions = req.body.positions || job.positions;
  
      const updatedJob = await job.save();
  
      res.json(updatedJob);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



// @route   PUT api/jobs/job_applicant_statuss
// @desc    Edit an existing job
// @access  Private


// @route   GET api/jobs/:id
// @desc    get single job
// @access  public

router.get('/job/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate('company', ['name', 'avatar'])
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.json(job)
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.status(500).send('Server Error')
    }
  })


// @route   GET api/jobs/
// @desc    get all jobs
// @access  public
router.get('/', async (req, res) => {
    try {
      const jobs = await Job.find().populate('company', ['name', 'logo'])
      res.json(jobs)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


// @route   Delete api/jobs/:id
// @desc    delete a job
// @access  private

router.delete('/:id',companyAuth, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)
      console.log(job)
      const spamJob = await SpamJob.findOne({job: req.params.id})
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
      // Check if the user deleting the job is the same user who posted it
      if (job.company._id.toString() !== req.company.id) {
        return res.status(401).json({ msg: 'You are not authorized to delete this job' })
      }
      
      if (spamJob){
        await spamJob.remove()
      }
      await job.remove()
      res.json({ msg: 'Job deleted' })
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.status(500).send('Server Error')
    }
  })

// @route   Delete api/jobs/admin/:id/:id
// @desc    delete a job as admin
// @access  private

router.delete('/admin/:id', adminAuth, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)
      const spamJob = await SpamJob.findOne({job: req.params.id})
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }

      await spamJob.remove()
      await job.remove()
      res.json({ msg: 'Job deleted' })
    } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Job not found' })
      }
      res.status(500).send('Server Error')
    }
  })
  
  
  // @route   POST api/jobs/apply/:id
  // @desc    User can apply for a job
  // @access  private
  
  router.post('/apply/:id', auth, async (req, res) => {
      try {
        const job = await Job.findById(req.params.id)
        const user = await User.findById(req.user.id)
        const profile = await Profile.findOne({user: req.user.id})
  
        if (!job) {
          return res.status(404).json({ msg: 'Job not found' })
        }
  
        // Check if user has already applied for this job
        if (job.applicants.find(applicant => applicant.user.toString() === req.user.id)) {
          return res.status(400).json({errors: [{msg: 'You have already applied for this job'}]})
        }
    
        const applicant = {
          user: req.user.id,
          name: user.name,
          location: profile.location,
          qualification: profile.qualification,
          field: profile.field,
          avatar: user.avatar
        }
    
        job.applicants.unshift(applicant)
    
        await job.save()
    
        res.json(job.applicants)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    })
  
  
  // @route   POST api/jobs/favorite/:id
  // @desc    User can add job to favorites
  // @access  private
  
  router.post('/favorite/:id', auth, async (req, res) => {
      try {
        const job = await Job.findById(req.params.id)
        const user = await User.findById(req.user.id)
        const profile = await Profile.findOne({user: req.user.id})
  
        if (!job) {
          return res.status(404).json({ msg: 'Job not found' })
        }
  
        // Check if user has already added job to favorites
        if (job.favorites.find(favorite => favorite.user.toString() === req.user.id)) {
          return res.status(400).json({errors: [{msg: 'You have already added job to favorites'}]})
        }
    
        const favorite = {
          user: req.user.id,
          name: user.name,
          location: profile.location,
          qualification: profile.qualification,
          field: profile.field,
          avatar: user.avatar
        }
    
        job.favorites.unshift(favorite)
    
        await job.save()
    
        res.json(job.favorites)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    })

  
// @route   DELETE api/favorite/:id
// @desc    User can remove job from favorites
// @access  private

router.delete('/favorite/:id', auth, async (req, res) => {
  try {
    // Find the job document that has an applicant with the same user_id as the currently authenticated user
    const job = await Job.findOne({ 'favorites.user': req.user.id })

    // If the job document is not found, return a 404 error response with a JSON object containing an error message
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' })
    }

    // Find the index of the user's application in the applicants array
    const removeIndex = job.favorites.map(favorite => favorite.user.toString()).indexOf(req.user.id)

    // If the user has not favourited this job, return a 404 error response with a JSON object containing an error message
    if (removeIndex === -1) {
      return res.status(404).json({ msg: 'You have not added job to favorites' })
    }

    // Remove the user's application from the applicants array
    job.favorites.splice(removeIndex, 1)

    // Save the modified job document
    await job.save()

    // Return a JSON object containing the updated applicants array
    res.json(job.favorites)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/jobs/applied
// @desc    Get jobs which user has applied
// @access  private

router.get('/applied', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ 'applicants.user': req.user.id }).populate('company', ['name'])
    res.json(jobs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/jobs/favorites
// @desc    Get favorite jobs
// @access  private

router.get('/favorites', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ 'favorites.user': req.user.id }).populate('company', ['name'])
    res.json(jobs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/jobs/posted
// @desc    Get jobs which company has posted
// @access  private

router.get('/posted', companyAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ 'company': req.company.id }).populate('company', ['name'])
    res.json(jobs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// @route   DELETE api/apply/:id
// @desc    User can delete application for job
// @access  private

router.delete('/apply/:id', auth, async (req, res) => {
    try {
      // Find the job document that has an applicant with the same user_id as the currently authenticated user
      const job = await Job.findOne({ 'applicants.user': req.user.id })
  
      // If the job document is not found, return a 404 error response with a JSON object containing an error message
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' })
      }
  
      // Find the index of the user's application in the applicants array
      const removeIndex = job.applicants.map(applicant => applicant.user.toString()).indexOf(req.user.id)
  
      // If the user has not applied for this job, return a 404 error response with a JSON object containing an error message
      if (removeIndex === -1) {
        return res.status(404).json({ msg: 'Application not found' })
      }
  
      // Remove the user's application from the applicants array
      job.applicants.splice(removeIndex, 1)
  
      // Save the modified job document
      await job.save()
  
      // Return a JSON object containing the updated applicants array
      res.json(job.applicants)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })


// @route   Get api/jobs/search
// @desc    User can search job by title
// @access  public

router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;

    // Create a regex pattern to perform a case-insensitive search
    const pattern = new RegExp(title, 'i');

    
    // Find similar jobs based on keywords in the title
    const similarJobs = await Job.find({
      $or: [
        { title: { $regex: pattern } },
        { description: { $regex: pattern } }
      ]
    }).populate('company', ['name'])  ;

    res.json({  similarJobs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// @route   Get api/jobs/filter
// @desc    User can filter job
// @access  public

router.get('/filter', async (req, res) => {
  try {
    const {  location, type, gender, qualification, skills, salaryFrom, salaryTo } = req.query;

    // Build the filter object based on the provided query parameters
    const filter = {};


    if (location) {
      const locationPattern = new RegExp(location, 'i');
      filter.location = locationPattern;
    }

    if (type) {
      filter.type = type;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (qualification) {
      filter.qualification = qualification;
    }

    if (skills) {
      const skillsArray = skills.split(',');
      filter.requiredSkills = { $all: skillsArray };
    }

    if (salaryFrom && !isNaN(parseFloat(salaryFrom))) {
      filter.salaryFrom = { $gte: parseFloat(salaryFrom) };
    }

    if (salaryTo && !isNaN(parseFloat(salaryTo))) {
      filter.salaryTo = { $lte: parseFloat(salaryTo) };
    }

    // Find jobs that match the provided filters
    const jobs = await Job.find(filter).populate('company', ['name']) ;

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
  

module.exports = router;
