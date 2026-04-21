import { motion } from "motion/react";
import { useRef, useState } from "react";

interface OtpProps {
  length?: number;
  onCompleteOtp: (otp: string) => void;
}
const OtpInput = ({ length = 6, onCompleteOtp }: OtpProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    const char = value.substring(value.length - 1);
    newOtp[index] = char
    setOtp(newOtp);

    if(value && index < length-1){
        inputRefs.current[index+1]?.focus()
    }
    
    const combinedOtp = newOtp.join("")
    if(combinedOtp.length === length){
        onCompleteOtp(combinedOtp)
    }

};
const hadleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>, index:number)=>{
        if(e.key === "Backspace" && !otp[index] && index > 0){
            inputRefs.current[index-1]?.focus()
        }
}

  return (
    <div className="py-5">
      <div className="flex gap-3 items-center justify-center">
        {otp.map((digit, index) => {
          return(
           <motion.input
           key={index}
           initial={{scale: 0.9, opacity: 0}}
           animate = {{scale: 1, opacity: 1}}
           transition={{delay: index*0.05}}
           type="text"
           inputMode="numeric"
           autoComplete="one-time-code"
           ref={(el)=>{if(el){
               inputRefs.current[index]=el;
            }}}
            value={digit}
           onChange={(e)=>handleChange(e.target.value, index)}
           onKeyDown={(e)=>{hadleKeyDown(e, index)}}
           className="w-12 h-14 bg-brand-card border-brand-border text-brand-text text-2xl text-center font-bold border-2 rounded-xl  focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-200">
            
          </motion.input>
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
