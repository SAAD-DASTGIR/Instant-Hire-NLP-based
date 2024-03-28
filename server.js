require("dotenv").config();
const express = require('express')
const connectDB = require('./config/db')
const Job = require('./models/Job')
const Resume = require('./models/Resume')
const cors = require('cors');
const morgan = require("morgan");
const { PythonShell } = require('python-shell');
const axios = require('axios')
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer({ dest: 'resumes/' });



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

// Handle received text data
app.post('/receive_text',async (req, res) => {
  const { text, path } = req.body;
  console.log('Received text:', text);
  console.log('path:', path);
  
  try {
    // const existingResume = await Resume.findOne({ path: path });
    // if (existingResume) {
    //   return res.status(409).json({ error: 'Resume with the same path already exists' });
    // }
    const newResume = new Resume({
      email: text['E-Mail'],
      phoneNumber: text['Phone Number'],
      name: text.Name,
      skills: text.Skills,
      qualification: text.Qualification.map(entry => entry.join(' ')),
      institutes: text.Institutes,
      experience: text.Experience,
      path: path
    });
    
    const savedResume = await newResume.save();
    console.log(savedResume)
    res.json(savedResume);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
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
