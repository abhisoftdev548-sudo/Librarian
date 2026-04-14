

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A component for handling authentication
 * @returns {React.ReactElement} A React element
 */
/*******  6b4bb2ce-ccc9-48f3-a4ee-1258000a5677  *******/
const Auth = ()   => {
  return (
    <div className='w-[90%] mx-auto py-5'>
      <nav className='flex justify-between items-center px-5'>
        <div className='w-full text-3xl font-bold text-[#0F172A]'>
          Librarian
        </div>
        <div className='w-full items-center'>
          <ul className='text-[#475569] flex w-full justify-center gap-8 font-medium text-sm'>
            <li>About</li>
            <li>Feature</li>
          </ul>
        </div>
        <div className='flex w-full justify-end gap-8 font-medium text-[14px] items-center'>
          <button className='bg-[#4F46E5] text-white py-2 rounded-md text-center px-4'>Get Started</button>
          <button className='border border-[#E2E8F0] py-2 rounded-md text-center px-4 hover:border-[#8bbaf3]'>Log In</button>
        </div>
      </nav>
      <section className='flex flex-col md:flex-row md:justify-between mt-16 justify-center md:items-center'>
        <div className='flex flex-col gap-8'>

        <div className='px-3 py-1 text-[14px] border rounded-2xl border-[#4F46E5] w-fit font-bold bg-[#4e46e58b] text-[#4F46E5] '>
          Your digital knowledge hub
        </div>
        <div>
          <span className='text-3xl sm:text-4xl md:text-6xl font-black flex flex-col gap-2'><span>CREATE AND LEARN</span> <span>FROM YOUR OWN</span>   <span className='text-[#4F46E5]'>DIGITAL LIBRARY</span></span>
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
          <div  className='animate-float  drop-shadow-2xl drop-shadow-blue-200 relative'>
          <div className='absolute px-3 py-1 rounded-2xl border border-[#7e7ec8] text-[14px] font-bold bg-[#1b1b1e8b] text-white top-20 -right-1 flex items-center gap-2'><span className='min-w-2 min-h-2 rounded-full bg-green-500 inline-block'></span><span>No Distraction</span></div>
          <img src="./digital-image.png" alt=""  />
          </div>
            
        </div>
      </section>
    </div>
  )
}

export default Auth
