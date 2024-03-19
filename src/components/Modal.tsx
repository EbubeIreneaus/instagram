import React from 'react'
type PropsType = {
    children: React.ReactNode,
    display: boolean
}

function Modal({children, display}: PropsType) {
    
  if (display) {
    return (
        <div className='fixed w-screen h-screen bg-black/50 flex justify-center items-center align-center z-[999] left-0 top-0'>
            <div className='bg-white max-w-lg w-full rounded-lg  px-10  text-black h-fit shadow-lg'>
                {children}
            </div>
        </div>
      )
  }
  return null
}

export default Modal