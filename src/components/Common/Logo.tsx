import React from 'react'

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <h1 className={`text-2xl font-extrabold  tracking-wide transition-colors cursor-pointer ${className || ''}`}>
      Medillon
    </h1>
  )
}

export default Logo;
