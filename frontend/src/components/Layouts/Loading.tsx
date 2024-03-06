import React from 'react'

const Loading = () => {
  return (
    <div className='bg-primary_bg absolute inset-0'>
        <div className='flex items-center justify-center h-lvh'>
            <div className='text-black'>
              <img className=' bg-transparent' src="/loading.gif" alt="d" />
            </div>
        </div>
    </div>
  )
}

export default Loading