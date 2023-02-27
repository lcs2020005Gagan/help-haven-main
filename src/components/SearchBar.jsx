import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
function SearchBar(props) {
  return (
    <div className='SearchBar' >
    <input type="text" className='SearchBox' placeholder='Search...' />
  </div>
  )
}

export default SearchBar