import React, { useEffect } from 'react'
import {BsDot} from 'react-icons/bs'
import {HiOutlineSparkles} from 'react-icons/hi'

function ExploreCard(props) {
    useEffect(() => {
     console.log("props ele",props.element)
    }, [])
    
  return (
    <div className='ExploreCard HoverEffectsBack'>
         {props.toRender==="Trending"&&<div className="ExploreCardDonationRequests">
                {props.rank}<BsDot/> Trending
            </div>}
         {props.toRender==="ForYou"&&<div className="ExploreCardDonationRequests">
                <HiOutlineSparkles style={{"color":"gold"}}/> Recommended
            </div>}
        <div className="ExploreCardTop">
            #{props.tag}
        </div>
        <div className="ExploreCardBottom">
            <div className="ExploreCardDonationRequests">
                123 requests <BsDot/>  89 donations
            </div>
        </div>
    </div>
  )
}

export default ExploreCard