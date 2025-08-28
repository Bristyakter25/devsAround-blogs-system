import React, { useEffect, useState } from "react";

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
     <div className="grid lg:grid-cols-2 col-span-1 gap-5">
         {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border rounded-lg p-4 hover:shadow-lg transition"
        >
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full h-64  rounded mb-4"
          />
          <h2 className="text-2xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600 mb-2">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-800">{blog.excerpt}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
     </div>
    </div>
  );
};

export default DisplayCreatedBlogs;
