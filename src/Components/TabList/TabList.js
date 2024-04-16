import React from 'react'
import'./TabList.css'

function TabList( {data, activeIndex, handleTabChange}) {

  return (

    <div className='tabs-container'>
      <div className='tab-header'>
        {data.map((tab, index) =>(
        <button 
        key={index}
        className={activeIndex === index ? "active-tab" : ""} 
        onClick={()=>handleTabChange(index)} 
        >
         {tab.category}
        </button>
        ))}
      </div>
   </div>
   
  )
}

export default TabList