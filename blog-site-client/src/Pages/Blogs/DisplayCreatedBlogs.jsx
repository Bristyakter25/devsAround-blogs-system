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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Most Popular</h1>
     <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-center  gap-y-10 ">
         {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border-l-2 px-3 py-5 rounded-lg   hover:shadow-lg transition"
        >
      <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full h-[150px] rounded-lg mb-4"
          />
           <p className="text-gray-600 mb-2">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-sm mb-3">Post By <span className="font-bold">{blog.authorName}</span> </p>
            <Link  key={blog._id} to={`/blogs/${blog.slug}`} ><h2 className="text-xl hover:underline hover:underline-offset-4  text-black font-bold">{blog.title} </h2></Link>
         
          {/* <p className="text-gray-800 h-[60px]">{blog.excerpt}</p> */}
          {/* <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div> */}
          </div>
          
          
       
      ))}
     </div>
    </div>
  );
};

export default DisplayCreatedBlogs;
