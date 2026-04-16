import GetStartedbutton from '@/feature/Auth/components/GetStartedbutton';
import LoginButton from '@/feature/Auth/components/LoginButton';
import React, { useState } from 'react'

import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from "react-icons/rx";

const Navbar:React.FC = () => {
  const [navOpen, setNavOpen] = useState(false)
  return (

    <nav className='shadow-xl z-50 fixed top-0 left-0 right-0 w-full bg-transparent backdrop-blur-2xl overflow-hidden '>
      <div className='flex flex-col h-full'>

        <div className="flex py-5 justify-between items-center px-5 max-w-[90%] mx-auto w-full ">
          <div className='w-full max-w-xs text-3xl font-bold text-brand-text'>
            Librarian
          </div>
          <div className='w-full items-center hidden md:flex'>
            <ul className='text-brand-muted flex w-full justify-center  gap-8 font-medium text-sm '>
              <li>About</li>
              <li>Feature</li>
            </ul>
          </div>
          <div className='hidden md:flex w-full justify-end gap-8 font-medium text-[14px] items-center max-w-70'>
           <GetStartedbutton/>
           <LoginButton />
          </div>

          <button onClick={()=>{setNavOpen(!navOpen)}} className='flex md:hidden text-3xl'>
            {navOpen ? <RxCross2/> : <IoMenu/>}
          </button>

        </div>
         <hr className='md:hidden border-brand-border' />
        {
          navOpen && (
            
        <div className='md:hidden flex flex-col max-w-[90%] px-5 gap-4 mx-auto pb-5 w-full'>
          <div className='w-full items-center flex flex-col py-2'>
            <ul className='text-brand-muted flex w-full justify-center gap-3 font-medium text-sm flex-col'>
              <li>About</li>
              <li>Feature</li>
            </ul>
          </div>
          <div className=' w-full justify-end gap-3 font-medium text-[14px] items-center flex flex-col border-t py-2 border-brand-border'>
            <GetStartedbutton/>
            <button className='border border-brand-border text-brand-text py-2 rounded-md text-center px-4 hover:border-brand-primary w-full'>Log In</button>
          </div>

        </div>
          )
        }
        
      </div>
      </nav>
      
  )
}

export default Navbar;
