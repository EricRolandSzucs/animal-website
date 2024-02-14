import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";
import Schedule from "./Schedule";
import InformationPanel from "./InformationPanel";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8800/announcements/" + id);

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
            {blog.images.length > 1 &&
              [1, 2, 3]
                .slice(0, Math.min(blog.images.length - 1, 3))
                .map((offset) => {
                  const sideImageIndex =
                    (startIndex + offset) % blog.images.length;
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
          <div style={{ width: '60%', position: 'fixed', bottom: '9%', right: '-30%' }}>
          <Schedule  />
          </div>
        </div>
      )}
      {blog && <InformationPanel blog={blog} />}
    </div>
  );
};

export default BlogDetails;
