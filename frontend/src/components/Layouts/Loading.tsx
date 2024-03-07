import React from 'react'

const Loading = () => {
  return (
    <div className='bg-primary_bg absolute inset-0 z-50'>
        <div className='flex items-center justify-center h-lvh'>
              <img width="100px" className=' bg-transparent' src="/loading.gif" alt="d" />
        </div>
    </div>
  )
}

export default Loading