import BlogList from "./BlogList";
import useFetch from "./useFetch";
import Search from "./Search"; // Import the Search component
import { useState, useEffect } from "react";

const Home = () => {
  const { error, isPending, data: allBlogs } = useFetch('http://localhost:8800/announcements');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (!isPending) {
      setFilteredBlogs(allBlogs);
    }
  }, [isPending, allBlogs]);

  return (
    <div className="home">
      <div >
        <img alt="home" className="home-image" src="/images/front.png"></img>
      </div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      <Search allBlogs={allBlogs} setFilteredBlogs={setFilteredBlogs} />
      {filteredBlogs.length > 0 ? (
        <BlogList blogs={filteredBlogs} />
      ) : (
        <div>No matching blogs found.</div>
      )}
    </div>
  );
};

export default Home;