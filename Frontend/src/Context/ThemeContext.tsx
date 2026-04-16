import {  createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextType {
    theme: 'light'| 'dark',
    setTheme: (theme: 'light' | 'dark') => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({children}:{children: ReactNode})=>{

const savedTheme = localStorage.getItem('theme')
const initialTheme =  (savedTheme === 'dark') || (savedTheme === 'light') ? savedTheme : 'light';
const [theme, setTheme] = useState<ThemeContextType['theme']>(initialTheme)

useEffect(()=>{
    const root = window.document.documentElement;
    if(theme === 'dark'){
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }else{
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
},[theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}