import React , {Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { removeFromSpamCompanies, deleteCompanyAccountAsAdmin } from '../../actions/profile'

const SpamCompanies = ({profiles, removeFromSpamCompanies, deleteCompanyAccountAsAdmin}) => {
  
  return (
    <div className='mt-8'>
      <h2 className="mt-3 text-primary text-4xl font-semibold mb-6">Companies Marked As Spam</h2>
      <table className="table mt-1">
        <thead>
          <tr>
              <th>Company Name</th>
              <th className="hide-sm">Industry</th>
              <th className="hide-sm">Location</th>
              <th className="hide-sm"></th>
              <th className="hide-sm"></th>
              <th className="hide-sm"></th>
          </tr>
        </thead>
        <tbody>
          {profiles ? (
            profiles.map((company) => (
              <tr key={company._id}>
                      <td className=""> {company.name} </td>
                      <td className="hide-sm"> {company.industry} </td>
                      <td className="hide-sm"> {company.location} </td>
                      <td className="hide-sm">
                          <Link to={`/company-profile/${company.company}`} className="btn btn-light">View Company</Link>
                      </td>
                      <td className="hide-sm">
                          <button onClick={() => removeFromSpamCompanies(company._id)} className="btn btn-primary">Remove from spam</button>
                      </td>
                      <td className="hide-sm">
                          <button onClick={() => deleteCompanyAccountAsAdmin(company._id)} className="btn btn-danger">Delete Company</button>
                      </td>
                  </tr>
            ))
          ) : (
            <p>No Company has been marked spam</p>
          ) }
        </tbody>
      </table>
        
    </div>
  )
}

SpamCompanies.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default connect(null, {removeFromSpamCompanies, deleteCompanyAccountAsAdmin})(SpamCompanies)