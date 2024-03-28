import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getJobById, applyForJob, getAppliedJobs, deleteJob, addToFavorites, removeFromFavorites, deleteApplication, markJobSpam } from '../../actions/job';
import JobTop from './JobTop';
import JobBottom from './JobBottom';

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
        await applyForJob(id, resume);
        setApplied(true);
    }

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
                                {favorite ? (
                                    <button disabled={!auth.isAuthenticated} onClick={() => {removeFromFavorites(id); setFavorite(!favorite)}} className={auth.isAuthenticated ? "px-8 py-3 bg-primary text-lg text-gray-200 font-semibold hover:opacity-70 duration-300 uppercase mr-4" : "btn btn-disable"}> Remove from Favourites</button>
                                ) : (
                                    <button disabled={!auth.isAuthenticated} onClick={() => {addToFavorites(id); setFavorite(!favorite)}} className={auth.isAuthenticated ? "px-8 py-3 bg-primary text-lg text-gray-200 font-semibold hover:opacity-70 duration-300 uppercase mr-4" : "btn btn-disable"}> Add to Favourites</button>
                                )}

                                {applied ? (
                                    <button disabled={!auth.isAuthenticated} onClick={()=> {deleteApplication(id); setApplied(!applied)}} className={auth.isAuthenticated ? "px-8 py-3 bg-primary text-lg text-gray-200 font-semibold hover:opacity-70 duration-300 uppercase mr-4" : "btn btn-disable"}>Revoke Application</button>
                                ) : (
                                    <Fragment>
                                        <input type="file" onChange={handleFileUpload} />
                                        <button disabled={!auth.isAuthenticated} onClick={handleApply} className={auth.isAuthenticated ? "px-8 py-3 bg-primary text-lg text-gray-200 font-semibold hover:opacity-70 duration-300 uppercase mr-4" : "btn btn-disable"} >Apply</button>
                                    </Fragment>
                                )}
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
