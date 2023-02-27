import React from 'react'
import {BiHomeCircle} from 'react-icons/bi'
import {Link } from 'react-router-dom'
function NavBar(props) {
  return (
    <>
    <div className='NavBar'>
      <div className="hm">

          {props.title}
      </div>
      {props.title==="Explore"&& <div className='ProfileJsTabs' >
            <div className={`${props.toRender==="ForYou"?"UlListActive":""} ProfileJsTabsLi`}>
            <Link to={`/explore/foru`} style={{"textDecoration":"none"}}>
            <li >
                For You
            </li>
            </Link>
            </div>
            <div className={`${props.toRender==="Trending"?"UlListActive":""} ProfileJsTabsLi`}>
            <Link to={`/explore/trending`} style={{"textDecoration":"none"}}>
            <li >
                Trending
            </li>
            </Link>
            </div>
        </div>
          }
    </div>
  
    </>
  )
}

export default NavBar