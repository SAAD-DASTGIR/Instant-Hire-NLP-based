import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Spinner} from '../layout/Spinner'
import { getProfiles,searchProfile } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({getProfiles,searchProfile, profile:{profiles, loading}}) => {

    const [searchTitle, setSearchTitle] = useState('');

    const handleSearch = async () => {
        searchProfile(searchTitle)
      };
    
    useEffect(() => {
        getProfiles()
      }, [getProfiles]);

      const navigate = useNavigate(-1)

  return (
    <div className='container'>
        <div className='ml-10'>
            <button onClick={() => navigate(-1)} className='btn btn-light mb-1' ><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</button>
            {loading || profiles===null ? <Spinner /> : <Fragment>
                <div className='flex justify-between items-center'>
                    <h1 className="text-6xl font-semibold mt-6 text-primary">Users</h1>
                    <div className='flex h-12 rounded-lg border-2 border-gray-400'>
                        <input
                            type="text"
                            placeholder="Enter Skills (eg. html,css)"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className='px-3 rounded-l-lg focus:outline-none'
                        />
                        <button className=' rounded-r-lg hover:opacity-80 transition duration-300 btn-primary text-md px-3 flex items-center' onClick={handleSearch}>
                        <i className="fa fa-search mr-2" aria-hidden="true"></i>
                        <p>Search</p>   
                        </button>
                    </div>
                </div>
                <p className="my-4 text-3xl">
                    <i className="fab fa-connectdevelop"></i>
                    Browse and Connect with Other Users
                </p>
                <div className="profiles mt-8">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ) : (
                        <h4>No profiles found </h4>
                    )}
                </div>
                </Fragment>}
        </div>
    </div>
  )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    searchProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles, searchProfile})( Profiles)