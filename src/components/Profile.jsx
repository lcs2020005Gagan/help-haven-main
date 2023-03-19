import React, { useEffect, useState } from 'react'
import { BsCalendarEvent } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import HomePageCard from './HomePageCard';
import LikedCards from './LikedCards';
import RightNavBar from './RightNavBar';
import PublishedRequests from './PublishedRequests';


function Profile(toRender) {

    var rand=0
    const params=useParams()
    const {profileId} =useParams();
   
    const host="http://localhost:5000"
    const [user,setUser]=useState(null)
    useEffect(() => {
      
        const func=async()=>
          { 
        const response=await fetch(`${host}/api/auth/getuserwithid/${params.profileId}`,{
          method: 'GET',
            });
          const json=await response.json();
          setUser(json)
        }
        if(params.profileId!=="self")
            func();
            console.log(user)  
      },[])
      useEffect(()=>{
      
        const getUserProfile=async ()=>{
            const response=await fetch(`${host}/api/auth/getuser`,{
                method: 'GET',
                headers: {
                  'auth-token': localStorage.getItem('token'),
                  'Content-Type':'application/json'
                },
              });
        
              const json=await response.json();
             //  console.log("side",json);
             setUser(json[0])    
            }
            if(params.profileId==="self"&&localStorage.getItem('token'))
            {
                getUserProfile();
                console.log(user)  

            }
      },[])
   
    
   

  return (
    <>
    {user&&<div className='ProfileJs' >
        <div className="RightAndLeft">
        <div className="ProfileJsBanner">
            <img src={user.bannerImg} alt="image" />
        </div>
       
        {<div className='ProfileJsProfilePic'>
            <img src={user.profileImg} />
        </div>}
        {<div className='ProfileJsProfileInfo'>
            <div className="ProfileJsProfileInfoBio">
                <div className="ProfileJsProfileInfoBioTop">
                <h5>{user.name}</h5>
                <MdModeEditOutline className='MdModeEditOutline'/>
                {/* <BsFillPersonPlusFill className='MdModeEditOutline'/> */}
                </div>
            <p>{user.about}</p>
            </div>
            <div className='ProfileJsProfileInfoDetails' style={{"display":"flex","gap":"0.3rem","alignItems":"end"}}>
               <div style={{"fontSize":"1.2rem"}}>
               <BsCalendarEvent/> 
                </div>
                Joined on 25th November
               

            </div>
            <div style={{"display":"flex","gap":"0.8rem"}}>

                 <p style={{"color":"white","fontSize":"0.8rem"}}>
                {user.followers.length} followers  
                </p>
                 <p style={{"color":"white","fontSize":"0.8rem"}}>
                {user.following.length} following  
                </p>
                </div>

        </div>}
        <div className='ProfileJsTabs' >
            <div className={`${toRender.toRender==="subscriptions"?"UlListActive":""} ProfileJsTabsLi`}>

            <Link to={`/profile/${profileId}`} style={{"textDecoration":"none"}}>
            <li >
                Published Requests
            </li>
            </Link>
            </div>
            <div className={`${toRender.toRender==="liked"?"UlListActive":""} ProfileJsTabsLi`}>
            <Link to={`/profile/${profileId}/liked`} style={{"textDecoration":"none"}}>
            <li >
                Liked
            </li>
            </Link>

            </div>
            {/* <div className={`${toRender.toRender==="bookmarked"?"UlListActive":""} ProfileJsTabsLi`}>

<Link to={`/profile/${profileId}/bookmarked`} style={{"textDecoration":"none"}}>

<li >
    Bookmarked
</li>
</Link>
</div> */}
        </div>
        


        <div className='ProfileJsUnderTabs'>
        {toRender.toRender==="subscriptions"&&<div className='ProfileJsUnderTabsCon'>
                    <PublishedRequests PublishedRequests={user.cardId}/>
            </div>}

           

            {toRender.toRender==="liked"&&<div className='ProfileJsUnderTabsCon'>
            <LikedCards PublishedRequests={user.likedCards}/>

          </div>}
            
        </div>

        </div>
        <RightNavBar location="profile" followers={user.followers} following={user.following}/>
    </div>}
    </>
  )
}

export default Profile