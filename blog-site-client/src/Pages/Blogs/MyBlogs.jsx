import { useEffect, useState, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://blog-site-server-gamma.vercel.app/blogs/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, [user]);

  if (!blogs.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-gray-500 text-lg">😕 You have no blogs yet.</p>
        <Link
          to="/createBlogs"
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition transform hover:scale-105"
        >
          ✍️ Write Your First Blog
        </Link>
      </div>
    );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://blog-site-server-gamma.vercel.app/blogs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        Swal.fire({ icon: "error", title: "Oops...", text: data.error });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while deleting!",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-extrabold text-black mb-8 text-center">
        My Blogs
      </h2>

      <div className="grid md:grid-cols-2 gap-y-8 gap-x-14">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col md:flex-row bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition transform hover:-translate-y-2"
          >
            <img
              src={blog.coverImageUrl}
              alt={blog.title}
              className="w-full md:w-1/3 h-48 md:h-auto object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
               <div>
                <p className="text-gray-500 my-3 text-md">
                  {new Date(blog.publishedAt).toLocaleDateString()} / <span className="font-bold">{blog.authorName}</span>
                </p>
                <Link to={`/blogs/${blog.slug}`}>
                  <h3 className="text-lg font-semibold hover:underline">{blog.title}</h3>
                </Link>
                <p className="mt-3 text-gray-700 line-clamp-4">{blog.excerpt}</p>
              </div>

             <div className="mt-6 flex gap-3">
  <button
    onClick={() => (window.location.href = `/edit-blog/${blog.slug}`)}
    className="px-4 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
  >
    ✏️ Edit
  </button>

  <button
    onClick={() => handleDelete(blog._id)}
    className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
  >
    🗑️ Delete
  </button>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
