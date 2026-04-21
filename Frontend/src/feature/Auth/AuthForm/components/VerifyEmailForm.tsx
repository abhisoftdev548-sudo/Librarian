import React from 'react'
import OtpInput from './OtpInput'

const VerifyEmailForm:React.FC = () => {
    const handleotp = (otpValue: string) =>  {
      console.log("OTP Entered:", otpValue);



  // 2. Ek fake delay do (jaise backend response de raha ho)
  setTimeout(() => {
    // Testing ke liye humne ek "Magic Number" rakh liya: 123456
    if (otpValue === "123456") {
      alert("Mock Success: OTP Verified! (Frontend testing)");
      // navigate("/dashboard"); 
    } else {
      alert("Mock Error: Invalid OTP! Try entering 123456.");
    }
    
    // setIsVerifying(false);
  }, 1500); // 1.5 seconds ka wait
    }
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-lg text-brand-text font-bold'>Email Vairification</h2>
      <p className='text-[12px] text-brand-muted'>We send 6 digit code to your email. Enter it below to continue</p>

      <div>
        <OtpInput length={6} onCompleteOtp={handleotp}/>
      </div>

        <button className='w-full bg-brand-primary  py-3 rounded-xl text-white shadow-xs text-lg'>Verify Email</button>
        <button className='w-full bg-brand-transparent backdrop-blur-md shadow-xs  py-3 rounded-xl text-brand-primary border border-brand-primary text-lg'>Resent OTP</button>
    </div>
  )
}

export default VerifyEmailForm
