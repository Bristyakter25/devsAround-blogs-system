import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const  DisplayCreatedBlogs= () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>
     <div >
         {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border flex justify-between px-4 my-5 rounded-lg p-4 hover:shadow-lg transition"
        >
          <div>
            <Link  key={blog._id} to={`/blogs/${blog.slug}`} ><h2 className="text-xl font-semibold">{blog.title} <span className="font-light">by</span> {blog.authorName}</h2></Link>
          <p className="text-gray-600 mb-2">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-800 h-[60px]">{blog.excerpt}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          </div>
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-[280px] rounded mb-4"
          />
          
        </div>
      ))}
     </div>
    </div>
  );
};

export default DisplayCreatedBlogs;
