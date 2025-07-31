import React from 'react'

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <h1 className={`text-xl md:text-2xl font-extrabold  tracking-wide transition-colors cursor-pointer ${className || ''}`}>
      Mediloon
    </h1>
  )
}

export default Logo;
