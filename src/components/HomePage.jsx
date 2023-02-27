import React, { useEffect, useState } from 'react'
import HomePageCard from './HomePageCard'
import NavBar from './NavBar'
import NoContent from './NoContent'
import RightNavBar from './RightNavBar'

function HomePage() {
  var rand=0
  const host="http://localhost:5000"
  const [articles,setArticles]=useState([])
  useEffect(() => {
    const func=async()=>{
      const response=await fetch(`${host}/api/upload/getallcards`,{
          method: 'GET',
        });
        const json=await response.json();
        setArticles(json);         
      }
      func();
      console.log(articles);
  }, [])
  return (

       <div className="HomePage">
        <div className="RightAndLeft">

        <NavBar title={"Home"}/>
        {articles&&articles.map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <HomePageCard {...element}/>
    </div>
})}
{articles&&articles.length===0&&<NoContent NoContentTitle="No Posts to view" NoContentMessage="Please check back later"/>}
        </div>
        <RightNavBar/>
       </div>
    )
}

export default HomePage