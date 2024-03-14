import React from 'react'

const Loading = () => {
  return (
    <div className='bg-primary_green absolute bg-opacity-25 inset-0 z-50'>
        <div className='flex items-center justify-center h-lvh'>
              <img width="100px" className=' bg-transparent' src="/loading.gif" alt="d" />
        </div>
    </div>
  )
}

export default Loading