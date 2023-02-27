import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExploreCard from './ExploreCard'
import NoContent from './NoContent'
import NavBar from './NavBar'
import RightNavBar from './RightNavBar'

function Explore(props) {
    const host="http://localhost:5000"
    var rand=0
    var randd=0
    const [articles, setArticles] = useState(null)
    const [tags,setTags]=useState([])
    const [tagArticles,settagArticles]=useState([])
    const [loading, setLoading]=useState(true)
    useEffect(() => {
        const pushTags=async()=>{
            if(articles)
            for(let i=0;i<articles.length;i++)       
            {
                for(let j=0;j<articles[i].tags.length;j++)
                {
                    if(tags.includes(articles[i].tags[j])===false)
                    {
                        setTags( tags => [...tags, articles[i].tags[j]]);
                    }
                }
            }
            setLoading(false);
        }
        const func=async()=>{
        const response=await fetch(`${host}/api/upload/getallcards`,{
            method: 'GET',
          });
          const json=await response.json();
          setArticles(json);  
          pushTags();
        }        
        func();
        console.log(articles);
        console.log(tags);
        
    },[loading])
  return (
    <>
    {loading?<NoContent/>:<div className='ProfileJs'>
        <div className="rightAndLeft">
            <NavBar title="Explore"  toRender={props.toRender}/>
            {tags&&tags.map((element) => {
  return <div className="d-flex justify-content-center " key={randd} style={{"width":"100%","padding":"0","margin":"0"}}>
     <ExploreCard tag={element} rank={++randd} toRender={props.toRender}/>
  </div>
})}
        </div>
        <RightNavBar/>
    </div>}
    </>
  )
}

export default Explore