import React from 'react'

const LoginPage = () => {
  return (
    <div className='relative w-screen h-screen flex items-center justify-center'>
      <div className="absolute top-0 left-0 bg-[var(--backgroundGreen)] w-full h-1/2 z-0"></div>
      <div className="flex flex-col justify-between w-1/3 min-w-[200px] h-4/5 bg-[var(--offWhite)] m-auto shadow-md z-1 p-8">
        <h1 className='text-2xl text-[var(--darkText)]'>Login to <span className='font-bold'>StudySprout</span></h1>

        <form>
          <input type="text" placeholder='Username' className='border-b w-full mt-8 focus:outline-none focus:text-[var(--darkText)]'/>
          <input type="password" placeholder='Password' className='border-b w-full mt-8 focus:outline-none'/>
          <input type="submit" className='mt-8 text-center bg-[var(--backgroundGreen)] text-[var(--darkText)] text-xl p-2 shadow-sm font-bold cursor-pointer w-full hover:bg-[var(--backgroundDarkGreen)]'/>
        </form>
        
        <p className='justify-self-end text-[var(--lightText)] text-sm'>Don't have an account? <a href="/register" className='font-bold underline'>Join now!</a></p>
      </div>
    </div>
  )
}

export default LoginPage