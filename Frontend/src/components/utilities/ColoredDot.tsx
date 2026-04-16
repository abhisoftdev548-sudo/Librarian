import React from 'react'

interface ColorDotProps {
    color: string
}
const ColoredDot:React.FC<ColorDotProps> = ({color}) => {
   
  return (
    
      <span className={`w-2 h-2 rounded-full bg-${color}  flex`}></span>
    
  )
}

export default ColoredDot
