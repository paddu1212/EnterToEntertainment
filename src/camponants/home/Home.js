import React from 'react'
import Trending from './Trending'
import Recommended from './Recommended'
import Kannada from './Kannada'
import Hindi from './Hindi'
import Telagu from './Telagu'
import Malayalam from './Malayalam'

const Home = () => {
  return (
    <div className='bg-gray-900 pl-16 pt-24 max-sm:pt-14 max-md:px-1 min-h-screen'>
        <div>
          <h1 className='text-xl p-3'>Trending</h1>
          <Trending />
        </div>
        <div>
          <h1 className='text-xl p-3'>Kannada</h1>
          <Kannada />
        </div>
        <div>
          <h1 className='text-xl p-3'>Hindi</h1>
          <Hindi />
        </div>
        <div>
          <h1 className='text-xl p-3'>Telagu</h1>
          <Telagu />
        </div>
        <div>
          <h1 className='text-xl p-3'>Malayalam</h1>
          <Malayalam />
        </div>
        <div >
          <h1 className='text-xl p-3'>Recommended for You</h1>
          <Recommended />
        </div>
    </div>
  )
}

export default Home
