import React, { useEffect } from 'react'
import {BiHomeCircle} from 'react-icons/bi'
import {MdTravelExplore,MdExplore} from 'react-icons/md'
import {BsPerson,BsBookmarks,BsFillPersonFill,BsBookmarksFill} from 'react-icons/bs'
import {FiMessageSquare} from 'react-icons/fi'
import {FaHands} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs'
import {AiOutlineHome,AiTwotoneHome} from 'react-icons/ai'
import {MdOutlineExplore} from 'react-icons/md'
import ButtonComp from './ButtonComp'
import PopUp from './PopUp'
import { Link, useParams ,useLocation} from 'react-router-dom';

function LeftNavBar() {
    
    let location=useLocation();
    useEffect(() => {
     console.log("location is",location.pathname);
    }, [])
    
    const func=(str)=>{
        let res="/"
        for(let i=1;i<str.length;i++)
        {if(str[i]=='/')return res;
        res+=str[i]}
    }

  return (
    <div className='LeftNavBar'>
        <div className="HelpHavenLogo">
            {/* <BsTwitter/> */}
            <FaHands/>
        </div>
        <div className='Profile'>
                    <div className='ProfileImgDiv'>
                        <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <defs>
                                <pattern id="img" patternUnits="userSpaceOnUse" width="100" height="100">
                                    <image href="https://cpb-us-w2.wpmucdn.com/portfolio.newschool.edu/dist/2/485/files/2014/08/DSC_1004-2-1a1yqd6.jpg" width="150" height="100" />
                                </pattern>
                            </defs>
                                <polygon id="profilePic" className='hoverEffects' points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img)" />
                        </svg>
                    </div>
                    Harsha
                </div>
        <ul className='LeftNavBarUl TextBig'>
            <Link to="/">
            <li className={`LeftNavBarLi ${location.pathname==="/"?"LeftNavActive":""}`}>{location.pathname!=="/"&&<AiOutlineHome/>} {location.pathname==="/"&&<AiTwotoneHome/>} Home</li>
            </Link>
            <Link to="/explore/foru">
            <li className={`LeftNavBarLi ${func(location.pathname)==="/explore"?"LeftNavActive":""}`}>{func(location.pathname)!=="/explore"&&<MdOutlineExplore/>} {func(location.pathname)==="/explore"&&<MdExplore/>} Explore</li>
            </Link>
            <li className='LeftNavBarLi'><FiMessageSquare/> Messages</li>
            <Link to="/bookmarks">
             <li className={`LeftNavBarLi ${location.pathname==="/bookmarks"?"LeftNavActive":""}`}>{location.pathname!=="/bookmarks"&&<BsBookmarks/>} {location.pathname==="/bookmarks"&&<BsBookmarksFill/>} Bookmarks</li>
            </Link>
            <Link to="/profile/self">
            <li className={`LeftNavBarLi ${func(location.pathname)==="/profile"?"LeftNavActive":""}`}>{func(location.pathname)!=="/profile"&&<BsPerson/>} {func(location.pathname)==="/profile"&&<BsFillPersonFill/>} Profile</li>
            </Link>
            <PopUp/>
        </ul>
    </div>
  )
}

export default LeftNavBar