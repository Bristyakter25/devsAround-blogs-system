import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisplayCreatedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Filter out editor's pick
        const nonEditorsPick = data.filter((blog) => !blog.isEditorsPick);
        // Sort by published date descending
        const sortedBlogs = nonEditorsPick.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        // Take latest 5
        setBlogs(sortedBlogs.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  if (!blogs.length)
    return <p className="text-center mt-10 text-gray-600">No blogs found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Most Popular</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border-l-2 px-3 py-5 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={blog.coverImageUrl}
              alt={blog.title}
              className="w-full h-[150px] rounded-lg mb-4 object-cover"
            />
            <p className="text-gray-600 mb-2">
              {new Date(blog.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-sm mb-3">
              Post By <span className="font-bold">{blog.authorName}</span>
            </p>
            <Link to={`/blogs/${blog.slug}`}>
              <h2 className="text-xl hover:underline hover:underline-offset-4 text-black font-bold">
                {blog.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCreatedBlogs;
