import { Link } from "react-router-dom";
import { useContext} from 'react';
import AuthContext from "./context/AuthProvider";

const NavbarLower = () => {
  const {auth} = useContext(AuthContext);
  return (
    <nav className="navbar-lower">
      {
       
      <div className="links">
        <Link to="/schedule" style={{ 
          margin: '20px'
        }}> SCHEDULE VISIT</Link>
      
        {auth ? (
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Create post</Link>
        ) : (
        <Link to="/login" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>Create post</Link>
        )}
      



      </div> }
    </nav>
    
  );
}
 
export default NavbarLower;