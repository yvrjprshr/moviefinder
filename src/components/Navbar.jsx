import React from "react";
import Logo from "../assets/logoo.png";
import {Link} from 'react-router-dom';
function Navbar() {
  return (
    <div className="border flex space-x-8 items-center pl-10 py-1">
      <div>
        <Link to="/"><img src={Logo} alt="logo image" className="w-[5rem]"/></Link>
      </div>
      <h3
        className="font-bold text-xl text-blue-400"
      ><Link to="/">Movies</Link></h3>
      <h3
        className="font-bold text-xl text-blue-400"
      ><Link to="/fav">Favourites</Link> </h3>
    </div>
  );
}

export default Navbar;
