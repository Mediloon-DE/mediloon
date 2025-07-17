import React from 'react'

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`text-2xl font-bold  tracking-wide transition-colors cursor-pointer ${className || ''}`}>
      Medillon
    </div>
  )
}

export default Logo;
