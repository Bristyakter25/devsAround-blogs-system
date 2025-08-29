import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://blog-site-server-gamma.vercel.app/blogs/${slug}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!blog) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-5xl mt-16 mx-auto p-6 sm:p-8">
        {/* Title and Author */}
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
          {blog.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          By <span className="font-medium mr-5">{blog.authorName}</span> •{" "}
          {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
      </div>
      {/* Cover Image */}
      {blog.coverImageUrl && (
        <img
          src={blog.coverImageUrl}
          alt={blog.title}
          className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md mb-6"
        />
      )}

      

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Blog Content */}
      <div
        className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      >
        
       
      </div>
      <p>{blog.excerpt}</p>
    </div>
  );
};

export default BlogDetails;
