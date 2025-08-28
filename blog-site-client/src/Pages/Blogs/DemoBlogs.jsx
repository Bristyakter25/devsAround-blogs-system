import React, { useEffect, useState } from "react";

const DemoBlogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDemoPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
        const data = await res.json();
        const demoPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.body.slice(0, 100),
          coverImageUrl: `https://picsum.photos/seed/${post.id}/1200/630`,
        }));
        setPosts(demoPosts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDemoPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map(post => (
        <div key={post.id} className="border rounded p-4">
          <img src={post.coverImageUrl} alt={post.title} className="mb-2 rounded" />
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p>{post.excerpt}...</p>
        </div>
      ))}
    </div>
  );
};

export default DemoBlogs;
