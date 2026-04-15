import { FaBan, FaBrain, FaLinkedin, 
  FaTwitter } from "react-icons/fa";
import { RiFocus2Line } from "react-icons/ri";
import { GrGithub, GrPersonalComputer } from "react-icons/gr";
import { IoPricetag, IoBookOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { LuLock, LuSun, LuMoon } from "react-icons/lu";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";


const Auth = () => {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light')

  useEffect(()=>{
    const root = window.document.documentElement;
    if(theme === 'dark'){
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }else{
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      
    }
  }, [theme])
  return (
    <div className='mx-auto bg-brand-bg transition-colors duration-300 relative'>
      <button onClick={()=> setTheme(theme === 'dark'?'light':'dark')} className="fixed z-50 bottom-5 right-5 bg-brand-bg shadow-xs shadow-brand-muted rounded-full h-10 w-10 flex justify-center items-center text-lg">
        {theme === 'dark' ? <LuSun/> : <LuMoon/>}
      </button>
      {/* Navbar */}
      <Navbar/>

      <main className="bg-brand-hero relative w-full">
        <section className='flex flex-col-reverse max-w-[90%] mx-auto py-20 pt-32 md:flex-row md:justify-between justify-center items-center md:items-center '>
          <div className='flex flex-col gap-8'>
            <div className='px-3 py-1 text-[14px] border rounded-2xl border-brand-primary w-fit font-bold bg-brand-primary/20 text-brand-primary'>
              Your digital knowledge hub
            </div>
            <div>
              <span className='text-3xl md:text-4xl lg:text-5xl font-black flex flex-col gap-2 text-brand-text'>
                <span>CREATE AND LEARN</span> 
                <span>FROM YOUR OWN</span>   
                <span className='text-brand-primary'>DIGITAL LIBRARY</span>
              </span>
            </div>
            <div className='text-lg text-wrap max-w-xl text-brand-muted'>
              Create, organize, and share your knowledge. Store files, notes, and sensitive data in one secure place. Learn without distraction.
            </div>
            <div className='flex w-full justify-center items-center gap-8 max-w-sm font-medium text-lg'>
              <button className='bg-brand-primary text-white py-3 rounded-md text-center w-full'>Get Started</button>
              <button className='border border-brand-primary text-brand-text py-3 rounded-md text-center w-full hover:bg-brand-primary/10'>Log In</button>
            </div>
            <div>
              <ul className='flex gap-4 text-brand-muted text-sm'>
                <li>• Notes & Files</li>
                <li>• Encrypted Lockers</li>
                <li>• Course Builder</li>
              </ul>
            </div>
          </div>
          <div className='animate-float max-w-87.5 md:max-w-96 drop-shadow-2xl relative'>
            <div className='absolute px-3 py-1 rounded-2xl border border-brand-border text-[14px] font-bold bg-brand-card/80 text-brand-text top-10 -right-1 flex items-center gap-2 shadow-lg'>
              <span className='min-w-2 min-h-2 rounded-full bg-green-500 inline-block'></span>
              <span>No Distraction</span>
            </div>
            <img src="./digital-image.png" alt="Hero" className="" />
          </div>
        </section>
      </main>

      {/* Stats/Feature Section */}
      <section className="w-full h-fit -mt-16 md:-mt-10 relative z-40">
        <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-2 max-w-[90%] mx-auto bg-brand-card p-5 shadow-2xl rounded-md border border-brand-border">
          <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] border-r border-brand-border items-center text-center">
            <FaBan className="text-red-500 text-xl"/>
            <p className="font-bold text-brand-text">Distraction Free</p>
          </div>
          <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] md:border-r border-brand-border items-center text-center">
            <RiFocus2Line className="text-blue-500 text-xl"/>
            <p className="font-bold text-brand-text">Focus Your Study</p>
          </div>
          <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] border-r border-brand-border items-center text-center">
            <GrPersonalComputer className="text-green-500 text-xl"/>
            <p className="font-bold text-brand-text">Digital Library</p>
          </div>
          <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] items-center text-center">
            <FaBrain className="text-pink-500 text-xl"/>
            <p className="font-bold text-brand-text">AI Powered</p>
          </div>
        </div>
      </section>

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
          <Card Icon={IoBookOutline} title="Smart Library Creation" />
          <Card Icon={SlNotebook} title="Encrypted Lockers" />
          <Card Icon={LuLock} title="Secure Storage" />
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
  );
};

// Reusable Small Components
const Card = ({ Icon, title }: { Icon: any, title: string }) => (
  <div className="flex flex-col justify-center shadow-xl hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border rounded-md border-brand-border bg-brand-card">
    <div className="bg-brand-hero min-h-40 flex items-center justify-center">
      <img src="./favicon.svg" alt="" className="w-16 opacity-50" />
    </div>
    <div className="p-10 flex flex-col gap-2">
      <div className="flex gap-2 items-center font-bold text-lg text-brand-text">
        <span className="p-2 rounded-md bg-brand-hero"><Icon/></span>
        <span>{title}</span>
      </div>
      <div className="text-start text-brand-muted text-sm">
        Build organized digital libraries for any subject in a structured environment.
      </div>
    </div>
  </div>
);

const FooterList = ({ title, items }: { title: string, items: string[] }) => (
  <div className="flex flex-col gap-2">
    <h2 className="font-bold text-[16px] uppercase text-brand-text">{title}</h2>
    <ul className="text-[14px] text-brand-muted flex flex-col gap-1">
      {items.map(item => <li key={item} className="hover:text-brand-primary cursor-pointer">{item}</li>)}
    </ul>
  </div>
);

export default Auth;