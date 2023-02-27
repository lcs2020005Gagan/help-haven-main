import React from 'react'
import {MdOutlineMail} from 'react-icons/md';
import {BiUpvote} from 'react-icons/bi'
import {BsBookmarkPlus} from 'react-icons/bs'
import {FiMessageSquare} from 'react-icons/fi'
import {AiOutlineShareAlt,AiOutlineEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';


function HomePageCard(props) {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate(`/story/${props._id}`)
    }
    const handleUpvote= async(e)=>{
            console.log("going in")
            const card_id=props._id
            const response=await fetch("http://localhost:5000/api/upload/upvote",{
                method: 'POST',
                headers: {
                  'auth-token':localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({card_id}),
              });
            const json=await response.json();
            console.log(json.success);
            if(json.success)
            {
              //redirect
              console.log("success ")
    
            }
            else
            {
              console.log("invalid cred")
            }
    
        }
    const handleBookmark= async(e)=>{
            console.log("going in")
            const card_id=props._id
            const response=await fetch("http://localhost:5000/api/upload/bookmark",{
                method: 'POST',
                headers: {
                  'auth-token':localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({card_id}),
              });
            const json=await response.json();
            console.log(json.success);
            if(json.success)
            {
              //redirect
              console.log("success mf")
    
            }
            else
            {
              console.log("invalid cred")
            }
    
        }
  return (
  <div className="whole-card">
      {props&&<div className="whole-card-effect">

       
             <div className="card-container">
        <div className="left">
            <div>
            <img src={props.image} alt="" />
            </div>
            

        </div>
        <div className="right">
            <h3 className='textClip-2'>
                {props.title}
            </h3>
            <div className="card-author">
                <img src={props.author.profileImg} alt="" />
                {props.author.name}
            </div>
            <hr />
            <div className="right-content textClip-5">
             {props.description}
            </div>

        </div>

    </div>
    
    <div className='bottom-container'>
                <div className="percentage">
                    80%
                </div>
                <div className="icons">
                    <FiMessageSquare/>
                    <BiUpvote onClick={handleUpvote}/>
                    <BsBookmarkPlus onClick={handleBookmark}/>
                    <AiOutlineShareAlt/>
                    <AiOutlineEye onClick={handleClick}/>
                </div>
        </div>
    </div>
   }
    </div>
  )
}

export default HomePageCard