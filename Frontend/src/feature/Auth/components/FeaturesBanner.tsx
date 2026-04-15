
import { FaBan, FaBrain } from 'react-icons/fa'
import { GrPersonalComputer } from 'react-icons/gr'
import { RiFocus2Line } from 'react-icons/ri'

const FeaturesBanner = () => {
  return (
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
  )
}

export default FeaturesBanner
