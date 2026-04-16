import { Reveal } from "@/components/utilities/Reveal";
import React from "react";


interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    borderClass: string;
}



const FeatureCard: React.FC<FeatureCardProps> = ({icon, title, borderClass}) => {
  return (
  <Reveal>
     <div className={`flex flex-col gap-2 p-4 md:text-[16px] text-[12px] ${borderClass} border-brand-border items-center text-center`}>
        {icon} 
        <p className="font-bold text-brand-text">{title}</p>
    </div>
     </Reveal>

  );
};

export default FeatureCard;
