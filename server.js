require("dotenv").config();
const express = require('express')
const { GoogleGenerativeAI } = require('@google/generative-ai');
const connectDB = require('./config/db')
const Job = require('./models/Job')
const Score =require('./models/Score')
const Resume = require('./models/Resume')
const cors = require('cors');
const morgan = require("morgan");
const { PythonShell } = require('python-shell');
const mongoose = require('mongoose')

const axios = require('axios')
const path = require('path');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const fs = require('fs');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer({ dest: 'resumes/' });
const { spawn } = require('child_process');
const fileUpload = require('express-fileupload');


const app = express()

app.use(cors({
    origin: '*'
}));

//Connect Database
connectDB() 

//Init middleware
app.use(express.json({extended: false}))

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res)=> res.send('API Running'))

//Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/company', require('./routes/api/company'))
app.use('/api/companyAuth', require('./routes/api/companyAuth'))
app.use('/api/companyProfile', require('./routes/api/companyProfile'))
app.use('/api/jobs', require('./routes/api/jobs'))
app.use('/api/admin', require('./routes/api/admin'))
app.use('/api/spam', require('./routes/api/spam'))
app.use('/api/interview', require('./routes/api/interview'))

app.get('/python', async (req, res) => {
  // Send a GET request to the Flask server
  axios.get('http://127.0.0.1:5001/')
  .then((response) => {
    // Handle the response from the Flask server
    console.log(response.data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
} )


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads'); // Upload files to the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Keep the original filename
//   }
// });

// const uploads = multer({
//   storage: storage,
//   onError: function (err, next) {
//     console.error("Multer error:", err);
//     next(err);
//   }
// // }).single('resume');
// app.post("/scores", async (req, res) => {
//   try {
//     const jobDescription = req.body.jobDescription;
//     const user = req.body.user;
//     const resumeFile = req.files.resume; // Assuming the file is sent as 'resume'

//     // Check if the file was uploaded
//     if (!resumeFile) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     // Move the uploaded file to a designated directory
//     const uploadPath = path.join(__dirname, 'uploads', resumeFile.name);

//     // Execute Python script to get score
//     const pythonProcess = spawn("python3", ["resume-score.py", uploadPath, jobDescription]);

//     let score = "";

//     pythonProcess.stdout.on("data", (data) => {
//       score += data.toString();
//       console.log(score); // Log the score here
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error("Error executing Python script:", data.toString());
//     });

//     pythonProcess.on("close", async (code) => {
//       if (code === 0) {
//         const scoreValue = parseFloat(score); // Convert score to a number if necessary

//         // Update score for the applicant in the database
//         const updatedJob = await Job.findOneAndUpdate(
//           { _id: req.params.id, "applicants.user": user },
//           { $set: { "applicants.score": score } },
//           { new: true }
//         );

//         if (!updatedJob) {
//           return res.status(404).json({ msg: 'Job or applicant not found' });
//         }

//         // Send the score to the frontend
//         res.json({ score: scoreValue });
//       } else {
//         console.error("Error getting score");
//         res.status(500).send({ success: false, message: "Error getting score" });
//       }
//     });

//     // Move the uploaded file to the designated directory
//     await resumeFile.mv(uploadPath);

//   }
//   catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).send({ success: false, message: "Error processing request" });
//   }
// });


// app.post("/scores", async (req, res) => {
//   try {
//     // Check if the file was uploaded
//     if (!req.files || !req.files.resume) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     const resumeFile = req.files.resume;
//     const jobDescription = req.body.jobDescription;

//     // Move the uploaded file to a designated directory
//     const uploadPath = path.join(__dirname, 'uploads', resumeFile.name);
//     await resumeFile.mv(uploadPath);

//     // Execute Python script to get score
//     const pythonProcess = spawn("python3", ["resume-score.py", uploadPath, jobDescription]);

//     let score = "";

//     pythonProcess.stdout.on("data", (data) => {
//       score += data.toString();
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error("Error executing Python script:", data.toString());
//     });

//     pythonProcess.on("close", async (code) => {
//       if (code === 0) {
//           console.log("Received file:", resumeFile.name);
//           console.log("Job description:", jobDescription);
//           console.log("Score:", score);
  
//           // Parse score to a number (if necessary)
//           const scoreValue = parseFloat(score);
  
//           try {
//               // Create a new Score document
//               const newScore = new Score({
//                   score: scoreValue, // Assuming score is a number
//                    // Store job description if needed
//                   // Add more fields as needed
//               });
  
//               // Save the new score document to the database
//               await newScore.save();
  
//               console.log(`Score saved to database successfully${score}`);
//               res.json(score); // Send the score as response if needed
//           } catch (error) {
//               console.error("Error saving score to database:", error);
//               res.status(500).send({ success: false, message: "Error saving score to database" });
//           }
//       } else {
//           console.error("Error getting score");
//           res.status(500).send({ success: false, message: "Error getting score" });
//       }
//   });
  
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).send({ success: false, message: "Error processing request" });
//   }
// });



// app.post("/scores", async (req, res) => {
//   try {
//     // Check if the file was uploaded
//     if (!req.files || !req.files.resume) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     const resumeFile = req.files.resume;
//     const jobDescription = req.body.jobDescription;

//     // Move the uploaded file to a designated directory
//     const uploadPath = path.join(__dirname, 'uploads', resumeFile.name);
//     await resumeFile.mv(uploadPath);

//     // Execute Python script to get score
//     const pythonProcess = spawn("python3", ["resume-score.py", uploadPath, jobDescription]);

//     let score = "";

//     pythonProcess.stdout.on("data", (data) => {
//       score += data.toString();
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error("Error executing Python script:", data.toString());
//     });

//     pythonProcess.on("close", async (code) => {
//       if (code === 0) {
//         console.log("Received file:", resumeFile.name);
//         console.log("Job description:", jobDescription);
//         console.log("Score:", score);

//         // Parse score to a number (if necessary)
//         const scoreValue = parseFloat(score);

//         try {
//           // Update the job with the applicant's score
//           const jobId = req.body.jobId;
//           const applicantId = req.body.applicantId;

//           const updatedJob = await Job.findOneAndUpdate(
//             { _id: jobId, "applicants._id": applicantId },
//             { $set: { "applicants.$.score": scoreValue } },
//             { new: true }
//           );

//           if (!updatedJob) {
//             return res.status(404).json({ success: false, message: 'Job or applicant not found' });
//           }

//           console.log(`Score saved to job document successfully: ${scoreValue}`);
//           res.json({ success: true, score: scoreValue });
//         } catch (error) {
//           console.error("Error updating job with score:", error);
//           res.status(500).json({ success: false, message: "Error updating job with score" });
//         }
//       } else {
//         console.error("Error getting score");
//         res.status(500).send({ success: false, message: "Error getting score" });
//       }
//     });

//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).send({ success: false, message: "Error processing request" });
//   }
// });


app.post("/scores", async (req, res) => {
  try {
    // Check if the file was uploaded
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    
    const jobId = req.body.jobId;
    const UserId = req.body.userId;
    const resumeFile = req.files.resume;
    const jobDescription = req.body.jobDescription;

    // Move the uploaded file to a designated directory
    const uploadPath = path.join(__dirname, 'uploads', resumeFile.name);
    await resumeFile.mv(uploadPath);

    // Execute Python script to get score
    const pythonProcess = spawn("python3", ["resume-score.py", uploadPath, jobDescription]);

    let scoreValue = ""; // Initialize scoreValue

    pythonProcess.stdout.on("data", (data) => {
      // Parse the received data as a floating-point number
      const receivedScore = parseFloat(data.toString());
      if (!isNaN(receivedScore)) {
          // If the parsed score is valid, assign it to scoreValue
          scoreValue = receivedScore;
          console.log("Score:", scoreValue);
      } else {
          console.error("Invalid score value received:", data.toString());
      }
    });
    
    pythonProcess.stderr.on("data", (data) => {
      console.error("Error executing Python script:", data.toString());
    });
    
    pythonProcess.on("close", async (code) => {
      if (code === 0) {
        // Ensure scoreValue is defined and valid
        if (!isNaN(scoreValue)) {
          try {
            // Create a new Score document
            const newScore = new Score({
              score: scoreValue,
              job: mongoose.Types.ObjectId(jobId),
              user: mongoose.Types.ObjectId(UserId)
            });
              console.log("333",newScore)
            // Save the new score document to the database
            await newScore.save();

            console.log("Score saved to database successfully.");
            res.json(scoreValue); // Send the score as response if needed
            console.log("Job id ", jobId);
            console.log("User id ", UserId);
          } catch (error) {
            console.error("Error saving score to database:", error);
            res.status(500).send({ success: false, message: "Error saving score to database" });
          }
        } else {
          console.error("Invalid score value received:", scoreValue);
          res.status(500).send({ success: false, message: "Invalid score value received" });
        }
      } else {
        console.error("Error getting score");
        res.status(500).send({ success: false, message: "Error getting score" });
      }
    });
    
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send({ success: false, message: "Error processing request" });
  }
});



// app.get("/applicants/scores", async (req, res) => {
//   try {
//     // Retrieve all scores from the database
//     const scores = await Score.find({}).populate('user', ['name', 'email']); // Populate the 'user' field if needed
  
//     // Extract scores from the retrieved data
//     const scoresData = scores.map(score => ({
//       score: score.score,
//       // Add more fields as needed
//     }));

//     // Send the scores data as a response
//     res.json(scoresData);
   
//   } catch (error) {
//     console.error("Error retrieving scores:", error);
//     res.status(500).send({ success: false, message: "Error retrieving scores" });
//   }
// });



app.get("/applicants/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Retrieve the job with applicants and their scores
    const job = await Job.findById(jobId)
      .populate('applicants.user', ['name', 'email']) // Populate user details for each applicant
      .exec();

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Extract applicants with their scores
    const applicants = job.applicants.map(applicant => ({
      user: applicant.user,
      name: applicant.name,
      location: applicant.location,
      qualification: applicant.qualification,
      field: applicant.field,
      avatar: applicant.avatar,
      score: applicant.score, // Include score
      email: applicant.email,
      approvedStatus: applicant.approvedStatus,
      date: applicant.date
    }));

    res.json({ success: true, applicants });
  } catch (error) {
    console.error("Error retrieving applicants:", error);
    res.status(500).json({ success: false, message: "Error retrieving applicants" });
  }
});




app.put('/api/jobs/jobstatus/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      const status = req.body.status;
      const user = req.body.user;
      console.log({status, user});
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }

      Job.findOneAndUpdate(
        { _id: req.params.id, "applicants.user": user },
        { $set: { "applicants.$.approvedStatus": status } },
        { new: true }
      ).exec((err, updatedJob) => {
        if (err) {
          console.error(err);
        } else {
          null
        }
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  app.put('/api/jobs/jobstatus/:id', async (req, res) => {
    try {
      const jobId = req.params.id;
      const { user, status } = req.body;
  
      // Find the job by ID
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      // Update the job status for the specified user
      const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId, "applicants.user": user },
        { $set: { "applicants.$.approvedStatus": status } },
        { new: true }
      );
  
      if (!updatedJob) {
        return res.status(404).json({ msg: 'Job or applicant not found' });
      }
  
      // Find the applicant's score
      const applicant = updatedJob.applicants.find(app => app.user.toString() === user.toString());
      const score = applicant ? applicant.score : null;
  
      // Send the updated job status and the score for the specified user
      res.json({ jobStatus: updatedJob, score });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  


app.post('/parse-resume', async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).send('No file uploaded');
  }

  const { name, data } = req.files.resume;
  const fileExt = path.extname(name);

  if (fileExt !== '.pdf') {
    return res.status(400).send('Only PDF files are allowed');
  }

  console.log(`Received file: ${name}`);

  // Specify the folder name
  const folderName = 'resumes';

  // Create the folder if it doesn't exist
  const folderPath = path.join(__dirname, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Write the received file data to a file
  const filePath = path.join(folderPath, name);
  fs.writeFileSync(filePath, data);

  async function sendPostRequest() {
    try {
      const formData = new FormData();
      formData.append('filePath', filePath);  // Add the filePath to the form data
      formData.append('file', fs.createReadStream(filePath));
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.post('http://127.0.0.1:8088/parse-resume', formData, config);
      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  await sendPostRequest();
})

app.post('/save-data', upload.single('pdf'), async (req, res) => {
  const path = req.body.path
  try {
    const fileData = fs.readFileSync(path);

    const existingResume = await Resume.findOne({ email: req.body.email });
    if (existingResume) {
      return res.status(400).json({ message: 'Resume with the same data has already been stored' });
    }

    const resume = new Resume({
      pdf: {
        data: fileData,
        contentType: 'application/pdf'
      },
      // Add other fields from the request body
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      skills: req.body.skills,
      qualification: req.body.qualification,
      institutes: req.body.institutes,
      experience: req.body.experience
    });


    await resume.save();

    res.status(200).json({ message: 'File uploaded successfully', resumeId: resume._id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file');
  } finally {
    // Remove the temporary file from the uploads folder
    fs.unlinkSync(path);
  }
})

app.get('/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find();
    if (!resumes) {
      return res.status(404).json({ message: 'No resumes found' });
    }

    const resumesData = resumes.map((resume) => ({
      email: resume.email,
      phoneNumber: resume.phoneNumber,
      name: resume.name,
      skills: resume.skills,
      qualification: resume.qualification,
      institutes: resume.institutes,
      experience: resume.experience,
      pdf: {
        data: resume.pdf.data.toString('base64'), // Convert Buffer to base64 string
        contentType: resume.pdf.contentType,
      },
    }));

    res.status(200).json({ resumes: resumesData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving resumes data');
  }
});

app.get('/resumes/search', async (req, res) => {
  try {
    const { skills } = req.query;

    if (!skills) {
      return res.status(400).json({ error: 'Skills parameter is required' });
    }

    const skillsArray = skills.split(',').map((skill) => skill.trim());

    const matchingResumes = await Resume.find({ skills: { $regex: new RegExp(skillsArray.join('|'), 'i') } }).exec();


    res.json(matchingResumes);
  } catch (error) {
    // Handle any errors that occurred during the search
    console.error('Error searching resumes:', error);
    res.status(500).json({ error: 'An error occurred while searching resumes' });
  }
});





// videoSDK documentation
app.get("/get-token", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "100m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});
app.post("/create-meeting/", (req, res) => {
  const { token, region } = req.body;
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };
  

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});
app.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//for resume parsing
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).send('No file uploaded');
  }

  const { name, data } = req.files.resume;
  const fileExt = path.extname(name);

  if (fileExt !== '.pdf') {
    return res.status(400).send('Only PDF files are allowed');
  }

  console.log(`Received file: ${name}`);

  // Specify the folder name
  const folderName = 'resumes';

  // Create the folder if it doesn't exist
  const folderPath = path.join(__dirname, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Write the received file data to a file
  const filePath = path.join(folderPath, name);
  fs.writeFileSync(filePath, data);

  const options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: __dirname, // path to your python script
    args: [filePath],
  };
  
  console.log(filePath);


  PythonShell.run('parse_resume.py', options, function (err, results)  {
    console.log('File Returned Successfully');
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    } else {
      console.log('File Returned Successfully');
      console.log(results);
      res.json(results);
    }
    // Remove the temporary file
    require('fs').unlinkSync(filePath);
  });
});

const genAI = new GoogleGenerativeAI("AIzaSyD8lt6NXXNklYRfzIx5WJNk8iQimjb5MsU");

// Endpoint for processing uploaded files
app.post('/receive_text', async (req, res) => {
  const { text: reqText, path } = req.body; // Renamed to avoid conflict
  
  console.log('Received text:', reqText);
  console.log('Path:', path);
  
  try {
    const jobDescription = "I'm hiring software developer";
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
    Act as an expert Application Tracking System (ATS) specializing in the tech field, encompassing software engineering, data science, data analysis, and big data engineering. Your objective is to assess the resume provided in ${reqText} against the given job description in ${jobDescription}. Identify missing keywords accurately in resume and list them in a structured format. The response should be presented in bullet points, numbered 1, 2, 3, 4, etc., following this structure: {{"MissingKeywords: 1, 2, 3, 4, ..."}}. Omit any details regarding match percentages and profile summaries. If you find the provided document does not meet the criteria of a resume, please reply with 'Invalid Resume'.`
    
    // Generating response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('Generated response:', response);
  
    if (!response) {
      throw new Error('Empty response received from Gemini API');
    }
  
    // Sending response
    const generatedText = await response.text();
    console.log('Generated text:', generatedText);
    res.send(generatedText);
    
    // Saving resume data
    // Replace this section with your actual Resume schema and saving logic
  } catch (err) {
    console.error('Error generating content:', err.message);
    res.status(500).json({ error: 'Error generating content' });
  }
  
});


// app.get('/resume/search', async (req, res) => {
//   const skill = req.query.skill; // Retrieve skill from query parameter

//   if (!skill) {
//     return res.status(400).json({ message: 'Please provide a skill parameter in the request.' });
//   }

//   try {
//     const matchingResumes = await Resume.find({ skills: { $in: skill } });

//     if (matchingResumes.length > 0) {
//       return res.json(matchingResumes);
//     } else {
//       return res.json({ message: 'No resumes found matching the provided skill.' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// Route: GET /resume
app.get('/resume', async (req, res) => {
  try {
    const allResumes = await Resume.find();

    if (allResumes.length > 0) {
      return res.json(allResumes);
    } else {
      return res.json({ message: 'No resumes found in the database.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
