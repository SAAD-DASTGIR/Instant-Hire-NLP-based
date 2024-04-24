import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getJobById, deleteJob } from "../../actions/job";
import Moment from "react-moment";
import "react-dropdown/style.css";
import { setReducer } from "../../actions/score";

const JobCompany = ({ getJobById, deleteJob, job: { job, loading }, auth, score }) => {
  const statusOptions = ["Pending", "Approved", "Rejected"];

  const { id } = useParams();
  useEffect(() => {
    const fetchJobs = async () => {
      await getJobById(id);
    };
    fetchJobs();
  }, [getJobById, id]);

  console.log("i am score", score);
  const navigate = useNavigate();
//   const fetchApplicantScores = async () => {
   
//   };
//  console.log (fetchApplicantScores())
function trimNumber(number, decimalPlaces) {
  return parseFloat(number.toFixed(decimalPlaces));
}

  return (
    <div className="container">
      {job === null || loading ? (
        <Spinner />
      ) : (
        <div className="ml-10">
          <div className="mb-8">
            <button onClick={() => navigate(-1)} className="btn btn-light">
              <i className="fa fa-chevron-left" aria-hidden="true"></i> Back
            </button>
            {auth.isCompanyAuthenticated &&
              auth.loading === false &&
              auth.company._id === job.company._id && (
                <Link to={`/edit-job/${job._id}`} className="btn btn-dark ">
                  Edit Job
                </Link>
              )}
            {auth.isCompanyAuthenticated &&
              auth.loading === false &&
              auth.company._id === job.company._id && (
                <button
                  onClick={() => deleteJob(job._id)}
                  className="btn btn-danger"
                >
                  Delete Job
                </button>
              )}
          </div>
          <div className="my-1 ">
            <div className="company-job bg-light">
              <h2 className="mb-1 text-primary font-semibold text-4xl">Job Details:</h2>
              <p className="mt">
                {" "}
                <strong>Title: </strong> {job.title}
              </p>
              <p className="mt">
                {" "}
                <strong>Location: </strong> {job.location}
              </p>
              <p className="mt">
                {" "}
                <strong>Qualification Required: </strong> {job.qualification}
              </p>
              <p className="mt">
                {" "}
                <strong className=" flex justify-start">Description: </strong> {job.description}
              </p>
              <p className="mt">
                {" "}
                <strong>Job type: </strong> {job.type}
              </p>
              <p className="mt">
                {" "}
                <strong>Gender: </strong> {job.gender}
              </p>
              <p className="mt">
                {" "}
                <strong>Salary: </strong> {job.salaryFrom} - {job.salaryTo}{" "}
              </p>
              <p className="mt">
                {" "}
                <strong>Positions available: </strong> {job.positions}
              </p>
              <p className="mt">
                {" "}
                <strong>Posted on: </strong>{" "}
                <Moment format="DD/MM/YYYY"> {job.date} </Moment>
              </p>
            </div>
          </div>
          <div className="my-8">
            <div className="company-job bg-light">
              <h2 className="mb-1 text-primary font-semibold text-4xl">Job Applicants</h2>
              <table className="table text-gray-600">
                <tbody>
                  <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Qualification</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Update Status</th>
                    <th>Score</th>
                  </tr>
                  {job.applicants ? (
                    job.applicants.map((applicant) => (
                      <tr className="applicant" key={applicant._id}>
                        <td>
                          <img
                            src={applicant.avatar}
                            alt="avatar"
                            className="small-img"
                          />
                        </td>
                        <td className="text-lg font-semibold">
                          {" "}
                          {applicant.name.charAt(0).toUpperCase() +
                            applicant.name.slice(1)}{" "}
                        </td>
                        <td className="hide-sm text-lg">
                          {" "}
                          {applicant.qualification && applicant.field ? (
                            applicant.qualification + " in " + applicant.field
                          ) : (
                            <span className="content-center">-</span>
                          )}{" "}
                        </td>
                        <td className="hide-sm text-lg">
                          {" "}
                          {applicant.email ? (
                            <a className="bg-primary text-base font-semibold px-3 py-2 rounded"href={`mailto:${applicant.email}`}>Contact</a>
                          ) : (
                            <span className="content-center">-</span>
                          )}{" "}
                        </td>
                        <td className="hide-sm text-lg">
                          {" "}
                          {applicant.approvedStatus ? (
                            applicant.approvedStatus
                          ) : (
                            <span className="content-center">-</span>
                          )}{" "}
                        </td>
                        <td>
                          <Link
                            to={`/profile/${applicant.user}`}
                            className=" hover:opacity-80 "
                          >
                            <p className="bg-primary text-base font-semibold px-3 py-2 rounded  ">View Profile</p>
                          </Link>
                        </td>
                        <td>
                          <select
                            className=" h-10 rounded text-lg font-semibold text-gray-600 px-3 py-1 "
                            name="status"
                            onChange={(e) => {
                              console.log(e.target.value);
                              console.log(applicant._id);
                              const requestOptions = {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  status: e.target.value,
                                  user: applicant.user,
                                }),
                              };
                              fetch(
                                `http://localhost:5000/api/jobs/jobstatus/${job._id}`,
                                requestOptions
                              )
                                .then((response) => response.json())
                                .then((responseJson) => {
                                  console.log(responseJson);
                                });
                            }}
                          >
                            <option>Select</option>
                            {statusOptions.map((status) => {
                              return <option key={status}>{status}</option>;
                            })}
                          </select>
                        </td>
                          <td>{trimNumber(applicant.score,2)}</td>

                      </tr>
                    ))
                  ) : (
                    
                    <tr>
                      <td colSpan="7">No user has applied for current job</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

JobCompany.propTypes = {
  getJobById: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  setReducer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  auth: state.auth,
  score: state.score
});

export default connect(mapStateToProps, { getJobById, deleteJob, setReducer })(JobCompany);
