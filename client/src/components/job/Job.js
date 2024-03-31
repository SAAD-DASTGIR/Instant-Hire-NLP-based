import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getJobById, applyForJob, getAppliedJobs, deleteJob, addToFavorites, removeFromFavorites, deleteApplication, markJobSpam } from '../../actions/job';
import JobTop from './JobTop';
import JobBottom from './JobBottom';
import { useDispatch } from 'react-redux';
import { setReducer } from '../../actions/score';

const Job = ({
    getJobById, 
    deleteJob, 
    getAppliedJobs,
    addToFavorites, 
    removeFromFavorites,
    markJobSpam,
    applyForJob, 
    deleteApplication,
    job:{job, favorite_jobs, applied_jobs, loading},
    auth
}) => {
    const [applied, setApplied] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [resume, setResume] = useState(null); // State to store resume file
    
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [applicantScore, setApplicantScore] = useState(null); // State to store applicant's score

    useEffect(() => {
        const fetchJobs = async () => {
            await getAppliedJobs();
            await getJobById(id);

            setApplied(applied_jobs.some(jobx => jobx._id === id));
            setFavorite(favorite_jobs.some(jobx => jobx._id === id));
        }
        fetchJobs();
    },[]);

    // Handler for file upload
    const handleFileUpload = (e) => {
        setResume(e.target.files[0]);
    }

    // Handler for applying to job with resume upload
    const handleApply = async () => {
        if (!resume) {
            alert("Please upload your resume.");
            return;
        }
        
        // Call applyForJob action to upload the resume and apply for the job
        await applyForJob(id, resume);

        // Fetch the score for the applicant after applying
        fetchScoreForApplicant(resume);
    }

    // Function to fetch score for the applicant
    const fetchScoreForApplicant = async (resume) => {
        try {
            // Prepare the request payload
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('jobDescription', job.description); // Append job description to the FormData
        
            // Make the POST request to the scores API
            const response = await fetch("/scores", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the response
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const score = await response.json();
                dispatch(setReducer(score)); 
                console.log(score);
            } else {
                throw new Error("Response is not in JSON format");
            }
        } catch (error) {
            console.error("Error fetching score for applicant:", error);
            // Handle error
        }
    };

    return (
        <div className='container'>
            {job === null || loading ? (
                <Spinner />
            ) : (
                <div className='ml-10 mb-14 '>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button onClick={() => navigate(-1)} className='btn btn-light' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
                        {auth.isAdminAuthenticated && <button className="btn btn-danger">Delete Job</button> }
                        {!auth.isAdminAuthenticated && <button onClick={() => markJobSpam(id)} className="btn btn-light">Mark as spam</button> }
                    </div>

                    {/* Job details */}

                    <div className=" mt-6">
                        <JobTop job={job} />
                        <JobBottom job={job} />
                        {!auth.isAdminAuthenticated && (
                            <div className=" bg-white px-24 pb-16">
                                {/* Other buttons */}
                                {applicantScore !== null && <p>Applicant's Score: {applicantScore}</p>}
                                <input type="file" onChange={handleFileUpload} />
                                <button disabled={!auth.isAuthenticated} onClick={handleApply} className={auth.isAuthenticated ? "px-8 py-3 bg-primary text-lg text-gray-200 font-semibold hover:opacity-70 duration-300 uppercase mr-4" : "btn btn-disable"} >Apply</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

Job.propTypes = {
    getJobById: PropTypes.func.isRequired,
    applyForJob: PropTypes.func.isRequired,
    markJobSpam: PropTypes.func.isRequired,
    deleteApplication: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
    auth: state.auth
})

export default connect(mapStateToProps, { getJobById, applyForJob, getAppliedJobs, deleteJob, addToFavorites, removeFromFavorites, deleteApplication, markJobSpam } )(Job);