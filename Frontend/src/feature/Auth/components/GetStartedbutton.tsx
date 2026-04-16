import { useAuth } from '@/Context/AuthContext'
import React from 'react'

const GetStartedbutton:React.FC = () => {
    const {setAuthActiveTab} = useAuth()
  return (
    <div className='w-full'>
      <button onClick={()=>setAuthActiveTab('signup')} className='bg-brand-primary text-white py-2 rounded-md text-center px-4 w-full'>Get Started</button>
    </div>
  )
}

export default GetStartedbutton
