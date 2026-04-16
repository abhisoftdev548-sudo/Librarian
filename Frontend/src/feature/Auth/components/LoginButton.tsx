import { useAuth } from '@/Context/AuthContext'
import React from 'react'

const LoginButton:React.FC = () => {
    const {setAuthActiveTab} = useAuth()
  return (
    <div className='w-full'>
       <button onClick={()=>{setAuthActiveTab('login')}} className='border border-brand-border text-brand-text py-2 rounded-md text-center px-4 hover:border-brand-primary w-full'>Log In</button>
    </div>
  )
}

export default LoginButton
