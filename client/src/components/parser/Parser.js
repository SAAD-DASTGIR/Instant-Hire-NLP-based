import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Spinner } from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

const Parser = props => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [name, setName] = useState([]);
    const [skills, setSkills] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    
    const handleUploadClick = async () => {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
      try {
        setLoading(true)
        const formData = new FormData();
        formData.append('resume', selectedFile);
        const response = await axios.post('/parse-resume', formData);

        const data = response.data;
        setResponseData(data)
        setEmail(data.email || []);
        setPhone(data.phone || []);
        setName(data.name || []);
        setSkills(data.skills || []);
        setQualifications(data.qualification || []);
        setInstitutes(data.institutes || []);
        setExperiences(data.experience || []);

        
        setLoading(false)
        console.log(data) 

      } catch (error) {
        console.error(error);
      }
    };


    const saveParsedData = async () => {
      if (responseData === null) {
        console.error('No data to upload');
        return;
      }
      try {
        const formattedData = {
          ...responseData,
          qualification: responseData.qualification.map((q) => q.join(' '))
        };
        const response = await axios.post('/save-data', formattedData);
    
        console.log(response.data);
        setSuccess('Resume saved successfully')
        setTimeout(() => {
          setSuccess('');
        }, 2000); // Clear the error after 2 seconds
        // Handle the response from the backend if needed
      } catch (error) {
        console.log(error.message)
        console.error(error.response.data.message);
        setError(error.response.data.message);
        setTimeout(() => {
          setError('');
        }, 2000); // Clear the error after 2 seconds
      }
    }


      //   if (!responseData || !responseData['E-Mail']) {
      //     return null;
      //   }
      //   return responseData['E-Mail'].map((email, index) => <li key={index}>{email}</li>);
      // };
    
      // const renderPhoneNumbers = () => {
      //   if (!responseData || !responseData['Phone Number']) {
      //     return null;
      //   }
      //   return responseData['Phone Number'].map((phoneNumber, index) => <li key={index}>{phoneNumber}</li>);
      // };
    
      // const renderNames = () => {
      //   if (!responseData || !responseData['Name']) {
      //     return null;
      //   }
      //   return responseData['Name'].map((name, index) => <li key={index}>{name}</li>);
      // };
    
      // const renderSkills = () => {
      //   if (!responseData || !responseData['Skills']) {
      //     return null;
      //   }
      //   return responseData['Skills'].map((skill, index) => <li key={index}>{skill}</li>);
      // };
    
      // const renderQualifications = () => {
      //   if (!responseData || !responseData['Qualification']) {
      //     return null;
      //   }
      //   return responseData['Qualification'].map((qualification, index) => (
      //     <li key={index}>
      //       {qualification[0]} ({qualification[1]})
      //     </li>
      //   ));
      // };
    
      // const renderInstitutes = () => {
      //   if (!responseData || !responseData['Institutes']) {
      //     return null;
      //   }
      //   return responseData['Institutes'].map((institute, index) => <li key={index}>{institute}</li>);
      // };
    
      // const renderExperience = () => {
      //   if (!responseData || !responseData['Experience']) {
      //     return <li>No experience available</li>;
      //   }
      //   return responseData['Experience'].map((experience, index) => <li key={index}>{experience}</li>);
      // };
      
      // const renderKeyValuePairs = (responseData) => {
      //   return Object.entries(responseData).map(([key, value]) => (
      //     <div key={key}>
      //       <h1>{key}</h1>
      //       {Array.isArray(value) ? (
      //         <ul>{value.map((item, index) => <li key={index}>{item}</li>)}</ul>
      //       ) : (
      //         <p>{value}</p>
      //       )}
      //     </div>
      //   ));
      // };  

  return (
    <div className=''>
      <div className='container'>
        <div className='ml-10 mb-12 bg-light p-12 shadow-lg rounded-lg '>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-6xl font-semibold text-primary mb-6 text-center'>Resume Parser</h2>
            <div className='ml-32'>
              <label htmlFor="fileInput">
                Choose File:
                <input  className='btn btn-light' type="file" id="fileInput" onChange={handleFileSelect} />
              </label>
            </div>
            <button className='btn btn-dark mt-8 w-40' onClick={handleUploadClick}>
              Upload
            </button>
          </div>
          <div className='text-left mt-12 '>
            {loading===false ? (
              responseData && 
              <>
              <h1 className='mt-5 font-semibold text-primary text-left text-2xl'>Names:</h1>
              <ul>{name.length > 0 ? (name.map((n, index) => (<li key={index} className='mr-10  inline-block' > <div className='flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i> <p>{n}</p></div> </li>))) : (<p>No Name Found</p>)}</ul>
              
              <h1 className='mt-5 font-semibold text-primary text-2xl'>Email:</h1>
              <ul>{email.length > 0 ? (<li className='mr-3  flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i><p>{email}</p> </li>) : (<p>No Email Found</p>)}</ul>

              <h1 className='mt-5 font-semibold text-primary text-2xl'>Phone Number:</h1>
              <ul>{phone.length > 0 ? (<li className='mr-3  flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i> <p>{phone}</p></li>) : (<p>No Phone Number Found</p>)}</ul>

              <h1 className='mt-5 font-semibold text-primary text-2xl'>Skills:</h1>
              <ul>{skills.length > 0 ? (skills.map((skill, index) => (<li  key={index} className='mr-10 inline-block '> <div className='flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i> <p>{skill}</p></div> </li>))) : (<p>No Skills Found</p>)}</ul>

              <h1 className='mt-5 font-semibold text-primary text-2xl'>Qualifications:</h1>
              <ul>{qualifications.length > 0 ? (qualifications.map((q, index) => (<li key={index} className='mr-10 inline-block '><div className='flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i> <p>{q[0]} in {q[1]} </p></div> </li>))) : (<p>No Qualifications Found</p>)}</ul>

              <h1 className='mt-5 font-semibold text-primary text-2xl'>Institutes:</h1>
              <ul>{institutes.length > 0 ? (institutes.map((i, index) => (<li key={index} className='mr-10 inline-block '><div className='flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i> <p>{i} </p></div> </li>))) : (<p>No Institutes Found</p>)}</ul>

              <h1 className='mt-5 font-semibold text-primary text-2xl'>Experience:</h1>
              <ul>{experiences.length > 0 ? (experiences.map((e, index) => (<li key={index} className='mr-10 inline-block '><div className='flex items-center'><i className='fas fa-circle text-[8px] mr-2'></i> <p>{e} </p></div> </li>))) : (<p>No Experience Found</p>)}</ul>
              <div className='flex justify-end'>
                <button onClick={() => saveParsedData()} className='btn btn-primary mt-10'>Save Parsed Data</button>
              </div>
              {error && (
                <div className="bg-red-500 fixed top-32 w-3/5 text-white px-8 py-2 rounded-md mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500 fixed top-32 w-3/5 text-white px-8 py-2 rounded-md mb-4">
                  {success}
                </div>
              )}
              </>
            ) : (
              <div className='flex justify-center'>
                <div className="loader"></div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

Parser.propTypes = {}

export default Parser