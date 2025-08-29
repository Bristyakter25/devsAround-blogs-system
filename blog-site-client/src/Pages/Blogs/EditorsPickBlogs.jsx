import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditorsPickBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs/editors-pick")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  if (!blogs.length) return <p className="text-center mt-10">No blogs found.</p>;

  const featuredBlog = blogs[0]; // First blog
  const otherBlogs = blogs.slice(1); // The rest

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Editor's Pick</h1>

      <div className="flex gap-6">
        {/* Left: Featured Blog */}
        {featuredBlog && (
          <div className="w-1/2 rounded-lg overflow-hidden shadow-lg">
            <img
              src={featuredBlog.coverImageUrl}
              alt={featuredBlog.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6 bg-gray-100">
              <p className="text-gray-500 mb-2">
                {new Date(featuredBlog.publishedAt).toLocaleDateString()} / Post By{" "}
                <span className="font-bold">{featuredBlog.authorName}</span>
              </p>
              <Link to={`/blogs/${featuredBlog.slug}`}>
                <h2 className="text-2xl font-bold hover:underline">{featuredBlog.title}</h2>
              </Link>
              <p className="mt-3 text-gray-700 line-clamp-4">{featuredBlog.excerpt}</p>
            </div>
          </div>
        )}

        {/* Right: Other Blogs */}
        <div className="w-1/2 flex flex-col gap-4">
          {otherBlogs.map((blog) => (
            <div
              key={blog._id}
              className="flex gap-4 items-center border-b pb-3 hover:bg-gray-50 transition"
            >
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div>
                <p className="text-gray-500 text-sm">
                  {new Date(blog.publishedAt).toLocaleDateString()} / {blog.authorName}
                </p>
                <Link to={`/blogs/${blog.slug}`}>
                  <h3 className="text-lg font-semibold hover:underline">{blog.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorsPickBlogs;
