import { Link } from "react-router-dom"

import Logout from "../Logout/Logout";

function Navbar() {
  return (
    <nav className="p-4 w-screen absolute top-0 left-0 flex justify-end items-center">
      <div>        
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
              Log In
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">
              Register
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;