import toonflix from "../images/toonflix.jpg";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon

const Navbar = () => {
  return (
    <header className=" px-8 bg-gray-200 flex flex-wrap items-center p-4 shadow-md">
      <div className="flex-1 flex justify-between items-center py-">
     <Link to='/'>   <img src={toonflix} className="h-10 w-40" alt="Logo" /></Link>
      </div>
      <div className=" ">
        <FiLogOut className="text-gray-700 cursor-pointer hidden" size={24} />
      </div>
    </header>
  );
};

export default Navbar;
