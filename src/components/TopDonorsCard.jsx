import React from 'react'
import { useEffect } from 'react'
import {BsFillPersonPlusFill,BsFillPersonDashFill,BsPersonCheckFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

function TopDonorsCard(props) {



  return (
    <>
    {props&&<div className={`TopDonorsCard ${(props.rank%2)===1?"AlternatingBg":""}`} >
        <div className="TopDonorsCardProfile">
      <Link to={`/profile/${props.element._id}`} style={{"display":"flex","color":"white","gap":"0.5rem"}}>
            <img src={props.element.profileImg} alt="" className='ImgImg' />
            <div className="TopDonorsCardContent">
            <div className="TopDonorsCardName">
                {props.element.name}
            </div>
            <div className="TopDonorsCardDonations">
                {props.element.donationsGiven.length} Donations
            </div>
        </div>
        </Link>
        </div>
        
        <div className="TopDonorsCardFollow">
        {props.location!=="profile"&&props.element.name!=="Sushant Holikar"&&<div className='FollowingButton' >Following <BsPersonCheckFill/></div>}
        {/* {props.location!=="profile"&&props.element.name!=="Sushant Holikar"&&<div className='FollowButton' >Follow <BsFillPersonPlusFill/></div>} */}
        {props.location==="profile"&&<BsFillPersonDashFill/>}
        </div>
    </div>}
    </>
  )
}

export default TopDonorsCard