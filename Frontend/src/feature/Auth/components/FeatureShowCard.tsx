import React from 'react'


/**
 * A card component for displaying features of the application.
 * It is a simple, empty div element that can be customized
 * with CSS styles to fit the desired appearance.
 */
interface FeatureShowCardProps {
    title: string;
    Icon: any
}
const FeatureShowCard:React.FC<FeatureShowCardProps> = ({title, Icon}) => {
  return (
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
  )
}

export default FeatureShowCard
