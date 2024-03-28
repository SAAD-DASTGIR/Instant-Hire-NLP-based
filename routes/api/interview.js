const express = require('express');
const router = express.Router();
const Interview = require('../../models/Interview');
const companyAuth = require('../../middleware/companyAuth')
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');


// POST request to schedule an interview
router.post('/schedule', [companyAuth,[
    check('date', 'Enter date to Schedule interview').not().isEmpty(),
    check('time', 'Enter time to Schedule interview').not().isEmpty()
]],async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
      const { userId, companyId, meetingId, date, time } = req.body;
  
      // Check if the interview already exists
      const existingInterview = await Interview.findOne({
        user: userId,
        company: companyId
      });
  
      if (existingInterview) {
        return res.status(400).json({errors: [{msg: 'You have already scheduled an interview with this User'}]});
      }
  
      const newInterview = new Interview({
        user: userId,
        company: companyId,
        meetingId : meetingId,
        date : date,
        time:time
      });
  
      const savedInterview = await newInterview.save();
      res.json(savedInterview);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

// DELETE request to delete a scheduled interview
router.delete('/scheduled-interview', companyAuth, async (req, res) => {
    try {
      const { userId, companyId } = req.body;
  
      // Find and delete the interview
      const deletedInterview = await Interview.findOneAndDelete({
        user: userId,
        company: companyId
      });
  
      if (!deletedInterview) {
        return res.status(404).json({ error: 'Interview not found' });
      }
  
      res.json({ message: 'Interview deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

// GET request to get interviews by userId 
router.get('/user',auth, async (req, res) => {
  try {

    const interviews = await Interview.find({user: req.user.id})
      .populate('user', ['name', 'email'])
      .populate('company', ['name', 'email']);

    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET request to get interviews bycompanyId
router.get('/company',companyAuth, async (req, res) => {
  try {

    const interviews = await Interview.find({company: req.company.id})
      .populate('user', ['name', 'email'])
      .populate('company', ['name', 'email']);

    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// GET request to retrieve meetingId based on userId and companyId
router.get('/interviews/:userId/:companyId', async (req, res) => {
    try {
      const { userId, companyId } = req.params;
  
      const interview = await Interview.findOne({ userId, company: companyId });
  
      if (!interview) {
        return res.status(404).json({ error: 'Interview not found' });
      }
  
      res.json({ meetingId: interview.meetingId });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.post('/set-meeting-id', async (req, res) => {
    try {
      const { userId, companyId, meetingId } = req.body;
  
      const interview = await Interview.findOneAndUpdate(
        { user: userId, company: companyId },
        { meetingId },
        { new: true }
      );
  
      if (!interview) {
        return res.status(404).json({ msg: 'Interview not found' });
      }
  
      res.json(interview);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.post('/set-meeting-null', async (req, res) => {
    try {
      const { userId, companyId } = req.body;
  
      const interview = await Interview.findOneAndUpdate(
        { user: userId, company: companyId },
        { meetingId: null },
        { new: true }
      );
  
      if (!interview) {
        return res.status(404).json({ msg: 'Interview not found' });
      }
  
      res.json(interview);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

// POST route to retrieve interview with matching userId and companyId
// router.post('/get-meeting-id', async (req, res) => {
//   try {
//     const { userId, companyId } = req.body;

//     const interview = await Interview.findOne({ user: userId, company: companyId });

//     if (!interview) {
//       return res.status(404).json({ msg: 'Interview not found' });
//     }

//     const { meetingId } = interview;

//     res.json({ meetingId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
  
  module.exports = router;