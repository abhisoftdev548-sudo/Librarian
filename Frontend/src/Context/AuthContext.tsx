import { createContext, useContext, useState, type ReactNode} from "react"

// interface User {
//     id: string,
//     name: string,
//     email: string,
//     description?: string
// }

interface AuthContextType {
    // user: User | null,
    authActiveTab: 'login'| 'signup' | null,
    setAuthActiveTab: (tab: 'login' | 'signup' | null) => void,
    // isActiveAuthForm: boolean,
    // setIsActiveAuthForm: (active: boolean) => void,
    // formData: any,
    // setFormData: (data: any) => void,
    // loading: boolean,
    // setLoading: (loading: boolean) => void,
    // login: (crediential: any) => Promise<void>,
    // signup: (crediential: any) => Promise<void>,
    // logout: () => void,
    // getMe: ()=> void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [authActiveTab, setAuthActiveTab] = useState<AuthContextType["authActiveTab"]>(null)

    return (
        <AuthContext.Provider value={{authActiveTab, setAuthActiveTab}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}