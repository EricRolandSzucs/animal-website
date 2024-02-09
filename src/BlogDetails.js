import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8800/announcements/' + id);
  const history = useHistory();

  const { auth } = useContext(AuthContext);
  const { setAuth } = useContext(AuthContext);

 

  const handleClick = () => {
    const headers = {
        "Authorization": "Bearer " + auth.accessToken,
      };

    fetch('http://localhost:8800/announcements/' + blog.announcement.id, {
      method: 'DELETE',
      headers,
      credentials: 'include'
    }).then(() => {
      history.push('/');
    }) 
  }


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <div className="blog-details-container">
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {blog && (
        <div className="blog-details">
          <div className="image-carousel">
            <div className="main-image">
              <img
                src={`/images/user/${blog.images[currentImageIndex].image}`}
                alt={`Main`}
              />
            </div>
            <div className="mini-images">
              {blog.images.map((image, index) => (
                <img
                  key={index}
                  src={`/images/user/${image.image}`}
                  alt={`Mini ${index + 1}`}
                  className={index === currentImageIndex ? "active" : ""}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
          <div className="side-panel">
            <div className="side-panel-info">
              <h3>Announcement Information</h3>
              <p>Name: {blog.announcement.name}</p>
              <p>Description: {blog.announcement.body}</p>
              <p>Breed: {blog.announcement.breed}</p>
            </div>
            {auth ? (
              <button onClick={handleClick} className="delete-button">
                Delete
              </button>
            ) : (
              null 
            )}
          </div>
        </div>
      )}
    </div>
  );
  

}
 
export default BlogDetails;