import React from 'react'
import { GoMail } from 'react-icons/go'
import { LuLock } from 'react-icons/lu'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'

const SignUp:React.FC = () => {
  return (
    <div>
      <form className='flex flex-col gap-2'>
              <div>
      
              <h2  className='text-brand-text font-bold text-xl'>Create your account</h2>
              <p className='text-brand-muted text-sm'>Start building your digital library</p>
              </div>

              <div className='flex flex-col gap-2'>
                  <label htmlFor="username">Username</label>
                  <div className='flex gap-3 items-center p-3 border border-brand-muted/30 rounded-xl'>
                      <div className='text-lg text-brand-muted'><RxAvatar/></div>
                      <input type="text" id='email' placeholder='Your username' className='text-[14px] flex-1 outline-none border-none '/>
                  </div>
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
                      <input type="text" id='password' placeholder='At least 6 characters' className='text-[14px] flex-1 outline-none border-none '/>
                      <div><MdOutlineRemoveRedEye /></div>
                  </div>
              </div>
             
              <button type="submit" className='bg-brand-primary text-brand-text font-bold py-3 rounded-xl mt-2'>Create Account</button>
             
              <p className='text-brand-muted text-[14px] text-center'>Already have an account?<span className='text-brand-primary hover:underline font-bold'>Sign in</span></p>
              <p className='text-brand-muted/30 text-[12px] text-center px-4'>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
            </form>
         </div>
    
  )
}

export default SignUp
