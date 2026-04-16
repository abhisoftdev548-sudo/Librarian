import { FaLinkedin, 
  FaTwitter } from "react-icons/fa";

import { GrGithub, } from "react-icons/gr";
import { IoPricetag, IoBookOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { LuLock, LuSun, LuMoon } from "react-icons/lu";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import HeroSection from "./components/HeroSection";
import FeaturesBanner from "./components/FeaturesBanner";
import { Reveal } from "@/components/utilities/Reveal";

import { useAuth } from "@/Context/AuthContext";
import AuthForm from "./AuthForm/AuthForm";
import FeatureShowCard from "./components/FeatureShowCard";
import { useTheme } from "@/Context/ThemeContext";


const Auth = () => {

  // const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light')
const {authActiveTab} = useAuth()

  // useEffect(()=>{
  //   const root = window.document.documentElement;
  //   if(theme === 'dark'){
  //     root.classList.add('dark')
  //     localStorage.setItem('theme', 'dark')
  //   }else{
  //     root.classList.remove('dark')
  //     localStorage.setItem('theme', 'light')
      
  //   }
  // }, [theme])
const {theme, setTheme} = useTheme()

  return (
    <div className='relative'>
      <div className={`${authActiveTab ? 'flex' : 'hidden'} fixed top-0 left-0 right-0 h-full w-full overflow-y-hidden bg-transparent  xl z-1000 backdrop-blur-[5px]  items-center justify-center`}>
        <AuthForm/>
      </div>
      <div className="mx-auto bg-brand-bg transition-colors duration-300">

      <button onClick={()=> setTheme(theme === 'dark'?'light':'dark')} className="fixed z-50 bottom-5 right-5 bg-brand-bg shadow-xs shadow-brand-muted rounded-full h-10 w-10 flex justify-center items-center text-lg">
        {theme === 'dark' ? <LuSun/> : <LuMoon/>}
      </button>
      {/* Navbar */}
      <Navbar/>

     <HeroSection/>

      {/* Stats/Feature Section */}
      <Reveal delay={0.2}>

     <FeaturesBanner/>
      </Reveal>


      {/* Content Section */}
      <section className="text-center mt-20 w-full flex flex-col justify-center items-center gap-5 px-5">
        <div className='px-3 py-1 text-[14px] border rounded-2xl border-brand-primary w-fit font-bold bg-brand-primary/20 text-brand-primary flex items-center gap-2'>
          <IoPricetag/> <span>Everything you need</span>
        </div>
        <div>
          <span className='text-3xl md:text-4xl lg:text-5xl font-black flex flex-col gap-2 text-brand-text'>
            <span>One platform for all</span>    
            <span className='text-brand-primary'>your knowledge</span>
          </span>
        </div>
        <div className='text-lg text-wrap max-w-xl text-brand-muted'>
          From personal notes to published courses, Librarian adapts to how you learn and create.
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mx-auto py-10">
          <div className="flex flex-col gap-3 text-wrap md:justify-center max-w-xl">
            <h2 className="text-4xl font-black text-start text-brand-text">
              <span>Transform Chaos into Clarity with</span> <span className="text-brand-primary">Zen Mode</span>
            </h2>
            <p className="text-lg text-start text-brand-muted">Just paste a link and make playlists to experience a distraction-free learning environment. No ads, no recommendations—just you and your studies.</p>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <img src="./library-boy.png" alt="Zen Mode" className="max-w-sm" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl py-10 gap-10">
          <FeatureShowCard Icon={IoBookOutline} title="Smart Library Creation" />
          <FeatureShowCard Icon={SlNotebook} title="Encrypted Lockers" />
          <FeatureShowCard Icon={LuLock} title="Secure Storage" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-footer text-brand-text mt-20 border-t border-brand-border transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pt-10 pb-5 px-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-brand-primary text-white text-2xl"><IoBookOutline/></div>
              <div className="text-2xl font-bold">Librarian</div>
            </div>
            <p className="text-sm text-brand-muted">Your digital knowledge hub. Create libraries, store content, and share your knowledge.</p>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-brand-border text-brand-text text-sm"><GrGithub/></div>
              <div className="p-2 rounded-full bg-brand-border text-brand-text text-sm"><FaTwitter/></div>
              <div className="p-2 rounded-full bg-brand-border text-brand-text text-sm"><FaLinkedin/></div>
            </div>
          </div>
          {/* Footer Lists */}
          <FooterList title="Product" items={['Features', 'Pricing', 'Roadmap']} />
          <FooterList title="Resources" items={['Documentation', 'Blog', 'Support']} />
          <FooterList title="Company" items={['About', 'Privacy', 'Terms']} />
        </div>
        <div className="max-w-7xl border-t border-brand-border mx-auto mt-6 flex items-center justify-between p-5 text-brand-muted text-xs">
          <div>© 2026 Librarian. All rights reserved.</div>
          <div>Made with ❤️ for learners</div>
        </div>
      </footer>
    </div>
      </div>
  );
};

// Reusable Small Components


const FooterList = ({ title, items }: { title: string, items: string[] }) => (
  <div className="flex flex-col gap-2">
    <h2 className="font-bold text-[16px] uppercase text-brand-text">{title}</h2>
    <ul className="text-[14px] text-brand-muted flex flex-col gap-1">
      {items.map(item => <li key={item} className="hover:text-brand-primary cursor-pointer">{item}</li>)}
    </ul>
  </div>
);

export default Auth;