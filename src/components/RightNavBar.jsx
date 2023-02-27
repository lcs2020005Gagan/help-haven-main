import React from 'react'
import SearchBar from './SearchBar'
import TopDonors from './TopDonors'
import TopTrending from './TopTrending'

function RightNavBar() {
  return (
    <div className='RightNavBar'>
        <SearchBar/>
        <TopTrending/>
        <TopDonors/>
    </div>
  )
}

export default RightNavBar