import { FaBan, FaBrain } from "react-icons/fa";
import { RiFocus2Line } from "react-icons/ri";
import { GrPersonalComputer } from "react-icons/gr";
import { IoPricetag } from "react-icons/io5";
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A component for handling authentication
 * @returns {React.ReactElement} A React element
 */
/*******  6b4bb2ce-ccc9-48f3-a4ee-1258000a5677  *******/
const Auth = ()   => {
  return (
    <div className=' mx-auto'>
      <nav className=' bg-[#F8FAFC] z-50 fixed top-0 left-0 w-full '>
        <div className="flex py-5 justify-between items-center px-5 max-w-[90%] mx-auto ">

        <div className='w-full text-3xl font-bold text-[#0F172A]'>
          Librarian
        </div>
        <div className='w-full items-center hidden md:flex'>
          <ul className='text-[#475569] flex w-full justify-center gap-8 font-medium text-sm'>
            <li>About</li>
            <li>Feature</li>
          </ul>
        </div>
        <div className='flex w-full justify-end gap-8 font-medium text-[14px] items-center'>
          <button className='bg-[#4F46E5] text-white py-2 rounded-md text-center px-4'>Get Started</button>
          <button className='border border-[#E2E8F0] py-2 rounded-md text-center px-4 hover:border-[#8bbaf3]'>Log In</button>
        </div>
        </div>
      </nav>
      <main className="bg-gray-200 relative w-full">

      <section className='flex flex-col-reverse max-w-[90%] mx-auto py-20  md:flex-row md:justify-between  justify-center items-center md:items-center mt-20'>
        <div className='flex flex-col gap-8'>

        <div className='px-3 py-1 text-[14px] border rounded-2xl border-[#4F46E5] w-fit font-bold bg-[#4e46e58b] text-[#4F46E5] '>
          Your digital knowledge hub
        </div>
        <div>
          <span className='text-3xl md:text-4xl lg:text-5xl font-black flex flex-col gap-2'><span>CREATE AND LEARN</span> <span>FROM YOUR OWN</span>   <span className='text-[#4F46E5]'>DIGITAL LIBRARY</span></span>
        </div>
        <div className='text-lg text-wrap max-w-xl'>
          Create, organize, and share your knowledge. Store files, notes, and sensitive data in one secure place. Learn without distraction.
        </div>
         <div className='flex w-full justify-center gap-8  max-w-sm font-medium text-lg'>
          <button className='bg-[#4F46E5] text-white py-3 rounded-md text-center w-full '>Get Started</button>
          <button className='border border-[#E2E8F0] py-3 rounded-md text-center w-full  hover:border-[#8bbaf3]'>Log In</button>
        </div>
        <div>
          <ul className='flex  gap-4'>
            <li>Notes & Files</li>
            <li>Encrypted Lockers</li>
            <li>Course Builder</li>
          </ul>
        </div>
        </div>
        <div>
          <div  className='animate-float max-w-87.5 md:max-w-96  drop-shadow-2xl w-fit  drop-shadow-blue-200 relative'>
          <div className='absolute px-3 py-1  rounded-2xl border border-[#7e7ec8] text-[14px] font-bold bg-[#1b1b1e8b] text-white top-10 -right-1 flex items-center gap-2'><span className='min-w-2 min-h-2 rounded-full bg-green-500 inline-block'></span><span>No Distraction</span></div>
          <img src="./digital-image.png" alt="" className=""  />
          </div>
            
        </div>
      </section>
      </main>
      <section className=" w-full  h-fit -mt-16 md:-mt-10 relative z-40">

      <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-2 max-w-[90%] mx-auto bg-white p-5   shadow rounded-md">
        <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] bg-white border-r border-gray-400 items-center text-center">
          <div><FaBan className="text-red-500 font-bold text-xl"/></div>
          <p className=" font-bold text-[#0F172A] ">Distraction Free</p>
        </div>
        
        <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] bg-white md:border-r md:border-gray-400 items-center text-center">
          <div><RiFocus2Line className="text-blue-500 font-bold text-xl"/></div>
          <p className=" font-bold text-[#0F172A]">Focus Your Study</p>
        </div>
        <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] bg-white border-r border-gray-400 items-center text-center">
          <div><GrPersonalComputer className="text-green-500 font-bold text-xl"/></div>
          <p className=" font-bold text-[#0F172A]">Digital Library</p>
        </div>
         <div className="flex flex-col gap-2 p-4 md:text-[16px] text-[12px] bg-white   items-center  text-center">
          <div><FaBrain className="text-pink-500 font-bold text-xl"/></div>
          <p className=" font-bold text-[#0F172A]">AI Powered</p>
        </div>
      </div>
      </section>

      <section className="text-center mt-10  w-full flex flex-col justify-center items-center gap-5">
        <div className='px-3 py-1 text-[14px] border rounded-2xl border-[#4F46E5] w-fit font-bold bg-[#4e46e58b] text-[#4F46E5]  flex items-center gap-2'>
          <span><IoPricetag/></span> <span>Everything you need</span>
        </div>
         <div>
          <span className='text-3xl md:text-4xl lg:text-5xl font-black flex flex-col gap-2'><span>One platform for all</span>    <span className='text-[#4F46E5]'>your knowledge</span></span>
        </div>
      </section>

    </div>
  )
}

export default Auth
