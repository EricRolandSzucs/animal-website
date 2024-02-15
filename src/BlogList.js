import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <div className="blog-preview-image">
              <img src={'/images/user/' + blog.url} alt={blog.name} />
            </div>
            <h2>{ blog.name }</h2>
            <p>{ blog.breed }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;