import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Schedule from "./Schedule";
import InformationPanel from "./InformationPanel";
import { Carousel } from "./Carousel";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8800/announcements/" + id);

  return (
    <>
    <div className="blog-details-container">
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {blog && <Carousel data={blog.images}></Carousel>}
        {/* <div style={{ width: '60%', position: 'fixed', bottom: '9%', right: '-20%' }}>
        <Schedule  />
        </div>  */}
        <Schedule style={{marginLeft: '25px', marginTop: '0', width:'700px', left: 'auto', transform: 'none'}} />
      
    </div>
    {blog && <InformationPanel blog={blog} />}
    </>
  );
};

export default BlogDetails;
