import React from 'react'
import nocontent from '../assets/nocontent.svg'


function NoContent(props) {
  return (
    <>
      <div className='NoContent'>
        <img src={nocontent} alt="" />
      
      <div className="no-content-message">
        <h3>{props.NoContentTitle}</h3>
        <h6>{props.NoContentMessage}</h6>
      </div>
      </div>

    </>
  )
}

export default NoContent