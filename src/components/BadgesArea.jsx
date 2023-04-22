import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TopDonorsCard from './TopDonorsCard'
import TopTrendingCard from './TopTrendingCard'
import Badges from './Badges'

function TopDonors() {
  var rand=0
 
  const host="http://localhost:5000"
  const [user,setUser]=useState(null)
  useEffect(() => {
    
      const func=async()=>
        { 
      const response=await fetch(`${host}/api/auth/getuser2`,{
        method: 'GET',
          });
        const json=await response.json();
    
        setUser(json)
      }
          func();
    },[])
  return (
    <div className='BadgesArea' >
        <div className="TopTrendingTitle">
            Badges : 
        </div>
        <div className="Ok" style={{"display":"flex","justifyContent":"space-around","padding":"1rem","alignItems":"center"}}>

        <Badges select="gold"/>
        <Badges select="silver"/>
        <Badges select="bronze"/>
        </div>
        
      
    </div>
  )
}

export default TopDonors