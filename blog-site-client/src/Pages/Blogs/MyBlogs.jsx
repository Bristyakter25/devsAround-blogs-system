import { useEffect, useState, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/blogs/user/${user.email}`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err));
  }, [user]);

  if (!blogs.length) return <p>No blogs found</p>;



const handleDelete = async (id) => {
  // SweetAlert confirmation
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return; // user canceled

  try {
    const res = await fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }), // verify author
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

      setBlogs(blogs.filter((blog) => blog._id !== id)); // remove deleted blog from state
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error,
      });
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


// const handleEdit = (blog) => {
//   // redirect to an edit page or open a modal
//   // for simplicity, you can navigate to `/edit-blog/:id`
//   window.location.href = `/edit-blog/${blog._id}`;
// };


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
       <div >
               {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border gap-x-5 flex justify-between px-4 my-5 rounded-lg p-4 hover:shadow-lg transition"
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
                <div className="flex gap-x-4 mt-4">
  <button onClick={() => window.location.href=`/edit-blog/${blog.slug}`} className="btn">Edit</button>

  <button
    onClick={() => handleDelete(blog._id)}
    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Delete
  </button>
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

export default MyBlogs;
