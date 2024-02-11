import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import Schedule from "./Schedule";

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


  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    setStartIndex((startIndex - 1 + blog.images.length) % blog.images.length);
  };

  const handleNextClick = () => {
    setStartIndex((startIndex + 1) % blog.images.length);
  };

  const handleSideImageClick = (index) => {
    setStartIndex(index);
  };

  return (
    <div className="blog-details-container">
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {blog && (
        <div className="image-carousel">
      <div className="main-image">
        <img
          src={`/images/user/${blog.images[startIndex].image}`}
          alt={`Main`}
        />
      </div>
      <div className="mini-images">
      {blog.images.length > 1 && [1, 2, 3].slice(0, Math.min(blog.images.length - 1, 3)).map((offset) => {
        const sideImageIndex = (startIndex + offset) % blog.images.length;
        return (
          <img
            key={sideImageIndex}
            src={`/images/user/${blog.images[sideImageIndex].image}`}
            alt={`Side ${offset + 1}`}
            onClick={() => handleSideImageClick(sideImageIndex)}
          />
        );
      })}
    </div>

      <div className="arrow-container">
        <button className="arrow prev" onClick={handlePrevClick}>
          &lt;
        </button>
        <button className="arrow next" onClick={handleNextClick}>
          &gt;
        </button>
      </div>
      <Schedule></Schedule>
    </div>
        
      )}
      {blog && (
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
    </div> )}
    </div>
  );
}
 
export default BlogDetails;