import React from 'react'
import { useAuth } from '@/Context/AuthContext'
import Login from '../../Login/Login'
import SignUp from '../../SignUp/SignUp'

const AuthAccountForm:React.FC = () => {
         const {authActiveTab, setAuthActiveTab} = useAuth()
         const activeAuthTab = " bg-brand-text text-brand-bg"
  return (
    <div>
      <div className='w-full p-1 rounded-xl bg-brand-muted/20 flex items-center mb-4'>
            <button onClick={()=>setAuthActiveTab('login')} className={`flex-1 text-center rounded-lg py-2 h-full  font-medium text-sm ${authActiveTab === 'login' ? activeAuthTab : 'text-brand-text'}`}>Sign In</button>
            <button onClick={()=>setAuthActiveTab('signup')} className={`flex-1 text-center rounded-lg py-2 h-full  font-medium text-sm ${authActiveTab === 'signup' ? activeAuthTab : 'text-brand-text'}`}>Create Account</button>
        </div>

        {authActiveTab === 'login'? <Login/> : <SignUp/>}
    </div>
  )
}

export default AuthAccountForm
