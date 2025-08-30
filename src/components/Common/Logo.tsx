import Link from 'next/link'
import Image from 'next/image'
import { Cormorant_Garamond, } from "next/font/google";

// Load font
const cormorant = Cormorant_Garamond({
  // weight: ["400", "600", "700"],
  subsets: ["latin"],
  style: ["italic"],
});

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={`flex items-center space-x-1 my-auto ${className || ""}`}>
      {/* Logo symbol */}
      <Image
        src="/images/Mediloon-Logo.webp"
        alt="Mediloon Logo"
        width={60}
        height={60}
        priority
      />

      {/* Logo text */}
      <div className="flex flex-col items-center mt-3 justify-center ">
        <span
          className={`text-xl md:text-3xl font-extrabold leading-3 ${cormorant.className}`}
        >
          MEDILOON
        </span>
        <span
          className={`text-xs md:text-sm font-extrabold text-gray-600 ${cormorant.className}`}
        >
          WIR VERBINDEN
        </span>
      </div>
    </Link>
  )
}

export default Logo;