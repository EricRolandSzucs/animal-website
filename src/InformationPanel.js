import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

const InformationPanel = ({ blog }) => {
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const handleClick = () => {
    const headers = {
      Authorization: "Bearer " + auth.accessToken,
    };

    fetch("http://localhost:8800/announcements/" + blog.announcement.id, {
      method: "DELETE",
      headers,
      credentials: "include",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="side-panel">
      <div className="side-panel-info">
        
        <h1>{blog.announcement.name}</h1>
        <p>{blog.announcement.breed}{'  '}•{' '}{blog.announcement.shelterName}</p>
        <hr></hr>
        <p>{blog.announcement.city}{'  '}•{' '}{blog.announcement.age}{'  '}•{' '}{blog.announcement.gender === 1 ? 'male': 'female'}{'  '}•{' '}{blog.announcement.stature}{'  '}•{' '}{blog.announcement.colors}</p>
        <hr></hr>
        <p><h2>About</h2> <br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{blog.announcement.body}</p>
      </div>
      {auth ? (
        <button onClick={handleClick} className="delete-button">
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default InformationPanel;
