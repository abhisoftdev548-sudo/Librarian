import { useAuth } from '@/Context/AuthContext'
import React from 'react'
import { IoBookOutline } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'

const AuthForm:React.FC = () => {
     const {authActiveTab, setAuthActiveTab} = useAuth()
     const activeAuthTab = " bg-brand-text text-brand-bg"
  return (
     <div className='max-w-md w-full  p-5 rounded-xl bg-brand-secondary border border-brand-muted/20 shadow-2xs flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <div className='text-2xl bg-brand-primary rounded-lg p-2'><IoBookOutline/></div>
                <div className='text-2xl font-bold'>Librarian</div>
            </div>
            <button onClick={()=>setAuthActiveTab(null)} className='text-2xl text-brand-muted'><RxCross2/></button>
        </div>
        <div className='w-full p-1 rounded-xl bg-brand-muted/20 flex items-center '>
            <button onClick={()=>setAuthActiveTab('login')} className={`flex-1 text-center rounded-lg py-2 h-full  font-medium text-sm ${authActiveTab === 'login' ? activeAuthTab : 'text-brand-text'}`}>Sign In</button>
            <button onClick={()=>setAuthActiveTab('signup')} className={`flex-1 text-center rounded-lg py-2 h-full  font-medium text-sm ${authActiveTab === 'signup' ? activeAuthTab : 'text-brand-text'}`}>Create Account</button>
        </div>

        {authActiveTab === 'login'? <Login/> : <SignUp/>}
     
    </div>
  )
}

export default AuthForm
