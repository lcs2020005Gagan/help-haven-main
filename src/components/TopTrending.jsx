import React from 'react'
import TopTrendingCard from './TopTrendingCard'

function TopTrending() {
  return (
    <div className='TopTrending'>
        <div className="TopTrendingTitle">
            Top Donations
        </div>
        <TopTrendingCard/>
        <TopTrendingCard/>
        <TopTrendingCard/>
    </div>
  )
}

export default TopTrending