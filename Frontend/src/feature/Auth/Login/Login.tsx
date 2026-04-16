import React from 'react'
import { GoMail } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { LuLock } from 'react-icons/lu';


const Login:React.FC = () => {
   
  return (
   <div>
 <form className='flex flex-col gap-2'>
        <div>

        <h2  className='text-brand-text font-bold text-xl'>Welcome back</h2>
        <p className='text-brand-muted text-sm'>Sign in to your library </p>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <div className='flex gap-3 items-center p-3 border border-brand-muted/30 rounded-xl'>
                <div className='text-lg text-brand-muted'><GoMail/></div>
                <input type="email" id='email' placeholder='you@example.com' className='text-[14px] flex-1 outline-none border-none '/>
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="password">Password</label>
            <div className='flex gap-3 items-center p-3 border border-brand-muted/30 rounded-xl'>
                <div className='text-lg text-brand-muted'><LuLock/></div>
                <input type="text" id='password' placeholder='Your password' className='text-[14px] flex-1 outline-none border-none '/>
                <div><MdOutlineRemoveRedEye /></div>
            </div>
        </div>
        <p className='text-brand-primary text-[12px] font-bold text-end py-1'>Forgot Password?</p>
        <button type="submit" className='bg-brand-primary text-brand-text font-bold py-3 rounded-xl mt-2'>Sign In</button>
        <div className='flex items-center'>
            <div className='border-t grow border-brand-muted/40'></div>
            <span className='text-brand-muted'>OR</span>
            <div className='border-t grow border-brand-muted/40'></div>
        </div>

         <button type="submit" className='bg-white  text-black font-bold py-3 rounded-xl flex items-center justify-between px-2'><img src="./google.svg" className='w-6' alt="" /><span className='flex-1 text-center'>Sign in with Google</span></button>
        <p className='text-brand-muted text-[14px] text-center'>Don't have an accound?<span className='text-brand-primary hover:underline font-bold'>Create One</span></p>
       
      </form>
   </div>
  )
}

export default Login
