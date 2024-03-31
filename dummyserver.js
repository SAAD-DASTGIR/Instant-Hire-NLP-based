require("dotenv").config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { spawn } = require('child_process');
const path = require('path'); // Add this line
const { error } = require("console");
const app = express()

app.use(cors({
    origin: '*'
}));

//Connect Database
// connectDB() 

//Init middleware
app.use(express.json({extended: false}))
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/scores", async (req, res) => {
    if (!req.files || !req.files.resume) {
        return res.status(400).json({ error: "No resume file provided" });
    }
    const { jobDescription } = req.body;
    const { resume } = req.files;
    const resumeFilePath = path.join(__dirname, 'uploads', resume.name); // Construct the file path
    console.log("Resume file path:", resumeFilePath);

    // Move the file to the desired location
    resume.mv(resumeFilePath, (err) => {
        if (err) {
            console.error("Error moving file:", err);
            return res.status(500).send({ success: false, message: "Error moving file: " + err.message });
        }
    });

    const pythonProcess = spawn("python3", ["resume-score.py", resumeFilePath, jobDescription]);

    let score = "";

    pythonProcess.stdout.on("data", (data) => {
        score += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Error executing Python script:", data.toString());
    });

    pythonProcess.on("close", async (code) => {
        if (code === 0) {
            console.log("Score:", score);
            res.send(score);
            console.log("Received file:", req.files.resume.name);
            console.log("Job description:", req.body.jobDescription);
        } else {
            console.error("Error getting score");
            res.status(500).send({ success: false, message: "Error getting score" });
        }

    });
});

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});