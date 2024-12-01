import { FaGithub } from "react-icons/fa";
import Logo from "./Logo";


const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 text-white py-1 sm:py-3">
      <div className="container mx-auto flex justify-center sm:justify-between items-center">
        <div>
            <a href="#" >
              <Logo/>
          </a>
        </div>
        <ul className="hidden sm:flex space-x-4">
          <li className="py-1 px-4 border bg-green-400/90 border-gray-400 rounded-full hover:bg-gray-800">
            <a href="#" className="flex items-center space-x-2">
              <FaGithub className="text-3xl" />
              <span>Github</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
