import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthProvider';

const Navbar = () => {
  const {auth} = useContext(AuthContext);
  const {setAuth} = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const getImageSrc = () => {
    if (isHovered) {
      return "/images/website-logo-circle-3.png";
    } else {
      return "/images/website-logo-circle-3.png";
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:8800/logout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });

        if (response.ok) {
            setAuth(null); // Clear the authentication state
        } else {
            console.error("Error:", response.statusText);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

  return (
    <nav className="navbar navbar-upper">
      <Link to="/"><h1>Meowsers Cat Shelter</h1></Link>
      
      <img alt="logo" className="logo" src={getImageSrc()}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut} />
      <img alt="account" src="/images/my_account.png" />
      <div className="links">
        {auth ? (

            <button onClick={handleLogout}>Logout</button>
        ) : (
          // User is not logged in
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
