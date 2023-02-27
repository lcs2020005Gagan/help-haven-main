import React from 'react'
import { useEffect } from 'react'
import {BsFillPersonPlusFill} from 'react-icons/bs'

function TopDonorsCard(props) {

  return (
    <>
    {props&&<div className='TopDonorsCard'>
        <div className="TopDonorsCardProfile">
            <img src={props.element.profileImg} alt="" className='ImgImg' />
            <div className="TopDonorsCardContent">
            <div className="TopDonorsCardName">
                {props.element.name}
            </div>
            <div className="TopDonorsCardDonations">
                {props.element.donationsGiven.length} Donations
            </div>
        </div>
        </div>
        <div className="TopDonorsCardFollow">
        <BsFillPersonPlusFill/>
        </div>
    </div>}
    </>
  )
}

export default TopDonorsCard