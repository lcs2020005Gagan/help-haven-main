import React, { useState } from 'react'
import {BsDot} from 'react-icons/bs'
import {FaRegThumbsUp,FaRegThumbsDown,FaThumbsDown,FaThumbsUp} from 'react-icons/fa'
import { Link } from 'react-router-dom'


function CommentCard(props) {
     

const [likes, setlikes] = useState(1) 
const [liked, setliked] = useState("") 
   const handleLiked=()=>{
    if(liked==="l")
    {
      setliked("");
      setlikes(likes-1);
    }
    else if(liked==="")
    {
      setliked("l");
      setlikes(likes+1);
    }
    else
    {
      setliked("l")
      setlikes(likes+2);
    }
    }
    const handledDisliked=()=>{
      if(liked==="d")
      {
        setliked("");
        setlikes(likes+1);
      }
      else if(liked==="")
      {
        setliked("d");
        setlikes(likes-1);
      }
      else
      {
        setliked("d")
        setlikes(likes-2);
      }
    }
  return (
    <>
    {props.element&&<div className='CommentCard'>
        <div className="CommentCardAuthorImg">
            <img src={props.element.author.profileImg} alt="" />
        </div>
        <div className="CommentCardContent">
            <div className="CommentCardHeader">
                    <Link to={`/profile/${props.element.author._id}`}> <h2>@{props.element.author.name}</h2></Link> 2 years ago
            </div>
            <div className="CommentCardMiddle">
               {props.element.comment}
            </div>
            <div className="CommentCardFooter">
            <div className="Card3InfoLike">
              <div className="Likes hoverEffects" style={{"color":"white","fontSize":"1rem"}}>
              {liked==="l"&&<FaThumbsUp onClick={()=>handleLiked()} />}{liked!=="l"&&<FaRegThumbsUp onClick={()=>handleLiked()}/>}
               </div>
               {likes}
               <div className="Dislikes hoverEffects" style={{"color":"white","fontSize":"1rem"}}>

               {liked==="d"&&<FaThumbsDown onClick={()=>handledDisliked()}/>}{liked!=="d"&&<FaRegThumbsDown onClick={()=>handledDisliked()}/>}
               </div>
            </div>
            </div>
        </div>
    </div>}
    </>
  )
}

export default CommentCard