import React, { Fragment } from 'react'
import spinner from '../../img/spinner.gif'

export const Spinner = () => {
  return (
    <Fragment>
        <img src={spinner} style={{width:'30px', margin:'6rem auto', display:'block'}} alt='Loading...' />
    </Fragment>
  )
}
