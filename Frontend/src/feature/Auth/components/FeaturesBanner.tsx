
import { FaBan, FaBrain } from 'react-icons/fa'
import { GrPersonalComputer } from 'react-icons/gr'
import { RiFocus2Line } from 'react-icons/ri'
import FeatureCard from './FeatureCard'
import { Reveal } from '@/components/utilities/Reveal'

const FeaturesBanner = () => {
  return (
    <Reveal>

     <section className="w-full h-fit -mt-16 md:-mt-10 relative z-40">
            <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-2 max-w-[90%] mx-auto bg-brand-card p-5 shadow-2xl rounded-md border border-brand-border">
              <FeatureCard icon={<FaBan className="text-red-500 text-xl"/>} title="Distraction Free" borderClass='border-r'/>
              
             <FeatureCard icon={<RiFocus2Line className="text-blue-500 text-xl"/>} title="Focus Your Study" borderClass='border-r'/>

             <FeatureCard icon={<GrPersonalComputer className="text-green-500 text-xl"/>} title="Digital Library" borderClass='border-r'/>

              <FeatureCard icon={<FaBrain className="text-pink-500 text-xl"/>} title="AI Powered" borderClass='border-none'/>

            </div>
          </section>
    </Reveal>
  )
}

export default FeaturesBanner
