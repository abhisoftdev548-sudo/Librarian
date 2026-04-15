import React from 'react'

interface ColorDotProps {
    color: string
}
const ColoredDot:React.FC<ColorDotProps> = ({color}) => {
   
  return (
    
      <span className={`min-w-2 min-h-2 rounded-full bg-${color} inline-block`}></span>
    
  )
}

export default ColoredDot
