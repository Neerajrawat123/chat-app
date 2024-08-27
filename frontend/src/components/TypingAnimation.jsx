import React from 'react'

function TypingAnimation() {
  return (
    <div
    className={`w-2/3  self-start float-right `}
      
      
    >
      <div className={` px-4 py-3 max-w-max flex text-lg  rounded-xl  bg-[#f6f6f6] `} >
      <div className='h-3 w-3 bg-[#ef6144] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-3 w-3 bg-[#ef6144] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-3 w-3 bg-[#ef6144] rounded-full animate-bounce'></div>
      </div>
    </div>  )
}

export default TypingAnimation