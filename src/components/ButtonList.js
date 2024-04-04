import React from 'react'
import Button from './Button'

const ButtonList = () => {

  const list = ["All", "Live", "Cricket", "Comedy", "Songs", "News", "Football", "Hockey", "All", "Live", "Cricket", "Comedy", "Songs", "News", "Football", "Hockey"];
  return (
    <div className=''>
      <div className='flex overflow-x-scroll'>
        <div className='flex'>
      {list.map((name, index)=> <Button key={index} name={name}/>)}
      </div>
      </div>
    </div>
  )
}

export default ButtonList
