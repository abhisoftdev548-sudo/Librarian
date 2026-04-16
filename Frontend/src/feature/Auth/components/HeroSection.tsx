import ColoredDot from '@/components/utilities/ColoredDot'
import { Reveal } from '@/components/utilities/Reveal'

import GetStartedbutton from './GetStartedbutton'

import LoginButton from './LoginButton'


const HeroSection = () => {

  return (
    <Reveal delay={0.2}>

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
                 <GetStartedbutton />
                 <LoginButton/>
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
                 <ColoredDot color="green-500"/>
                 <span>No Distraction</span>
               </div>
               <img src="./digital-image.png" alt="Hero" className="" />
             </div>
           </section>
         </main>
    </Reveal>
  )
}

export default HeroSection
