import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Fetch all blogs
  useEffect(() => {
    fetch("https://blog-site-server-gamma.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  // Get unique tags for the sidebar
  const tags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  // Filter blogs based on search or selected tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
  <div>
      <h2 className="text-3xl mt-20 font-extrabold text-black mb-8 text-center">
        All Blogs
      </h2>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Left Sidebar */}
      <div className="md:col-span-1 flex flex-col gap-6">
        {/* Search */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Blogs</h2>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(tag === selectedTag ? "" : tag)
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedTag === tag
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } transition`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:col-span-2 flex flex-col gap-6">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col h-full items-center md:flex-row gap-4 py-4 px-3 border rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-full md:w-48 h-40  object-cover rounded-lg"
              />
              <div className="flex-1">
                <Link to={`/blogs/${blog.slug}`}>
                  <h3 className="text-xl font-semibold hover:text-indigo-600 transition">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(blog.publishedAt).toLocaleDateString()} •{" "}
                  <span className="italic">{blog.authorName}</span>
                </p>
                <p className="text-gray-700 line-clamp-3 mb-2">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default AllBlogs;
