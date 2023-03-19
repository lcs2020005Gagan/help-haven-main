import React, { useEffect, useState } from 'react'
import ButtonComp from './ButtonComp'
import { useParams } from 'react-router-dom'
import CommentCard from './CommentCard'
import Comments from './Comments'

function Story() {
    var rand=0
    const params=useParams()
    const {storyId} =useParams();
   
    const host="http://localhost:5000"
    const [card,setCard]=useState(null)
    useEffect(() => {
      
        const func=async()=>
          { 
        const response=await fetch(`${host}/api/upload/getcardwithid/${params.storyId}`,{
          method: 'GET',
            });
          const json=await response.json();
          setCard(json)
        }
            func();
            // console.log("storyyyy",card)
      },[])
    return (
        <>
        {card&&<div className="story-container">
            <div className="story-image-and-title">
                <div className="story-image">
                    <img src={card.image} alt="" />
                </div>
                <div className="story-title">
                    <h1>
                        {card.title}
                    </h1>
                    <h5>
                        {card.briefDescription}
                    </h5>
                </div>
            </div>
            <div className="author-and-donation">
                <div className="author-name">
                <div className="card-author">
                <img src={card.author.profileImg} alt="" />
                {card.author.name}
            </div>
                    <br />
                    {card.date}

                </div>
                <div className="donate-btn">
                    <ButtonComp className="donate-btn" title={"Donate"} />
                </div>
                <div className="donation-count">
                    <span>Amount Donated : </span> 0
                    <br />
                    <span>Amount Needed : </span> 10000$
                </div>
            </div>
            <div className="full-details">
              {card.description}
            </div>

            <Comments comments={card.commentsSection}/>
        </div>}
        </>
    )
}

export default Story