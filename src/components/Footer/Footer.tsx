import Link from "next/link";
import Logo from "../Common/Logo";


const Footer = () => {
  return (
      <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                      <Logo className={"text-gray-50 hover:text-gray-200"} />
                      {/* <p className="text-gray-400 mt-2">Qualitätsmedizinprodukte für Fachkräfte</p> */}
                  </div>
                  <div className="flex space-x-3 md:space-x-6">
                      <Link href="#" className="hover:text-blue-400">Kontakt</Link>
                      <Link href="#" className="hover:text-blue-400">Über Uns</Link>
                      <Link href="#" className="hover:text-blue-400">Datenschutz</Link>
                      <Link href="#" className="hover:text-blue-400">AGB</Link>
                  </div>
              </div>
              <div className="mt-8 text-center text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Mediloon. Alle Rechte vorbehalten.
              </div>
          </div>
      </footer>
  )
}

export default Footer