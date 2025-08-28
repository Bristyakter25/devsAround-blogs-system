import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import AuthContext from "../../Context/AuthContext";

const EditBlog = () => {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [excerpt, setExcerpt] = useState(""); // ✅ Added excerpt state

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
    ],
    content: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setTitle(data.title);
        setTags(data.tags.join(", "));
        setCoverImage(data.coverImageUrl);
        setExcerpt(data.excerpt); // ✅ Set existing excerpt
        editor?.commands.setContent(data.content);
      })
      .catch((err) => console.error(err));
  }, [slug, editor]);

  if (!blog) return <p>Loading blog data...</p>;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user?.email || user.email !== blog.authorEmail) {
      alert("You are not authorized to update this blog");
      return;
    }

    const updatedBlog = {
      email: user.email,
      title,
      slug: blog.slug,
      content: editor.getHTML(),
      excerpt, // ✅ Use the state value
      tags: tags.split(",").map((t) => t.trim()),
      coverImageUrl: coverImage,
    };

    try {
      const res = await fetch(`http://localhost:5000/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blog updated successfully!");
        navigate(`/blogs/${blog.slug}`);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update blog");
    }
  };

  const toolbarButton = (label, command, isActive = false) => (
    <button
      type="button"
      onClick={command}
      className={`px-2 py-1 border rounded ${
        isActive ? "bg-blue-500 text-white" : "bg-white text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">✍️ Edit Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Enter tags, separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Excerpt */}
        <textarea
          placeholder="Enter blog excerpt..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

         

        {/* Cover Image */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="coverImageInput"
            className="hidden"
            onChange={(e) =>
              setCoverImage(URL.createObjectURL(e.target.files[0]))
            }
          />
          <label
            htmlFor="coverImageInput"
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
          >
            Change Cover Image
          </label>
          {coverImage && (
            <img
              src={coverImage}
              alt="cover"
              className="mt-2 rounded-lg max-h-60"
            />
          )}
        </div>

         <div className="flex flex-wrap gap-2 mb-2">
          {toolbarButton(
            "H1",
            () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            editor.isActive("heading", { level: 1 })
          )}
          {toolbarButton(
            "H2",
            () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            editor.isActive("heading", { level: 2 })
          )}
          {toolbarButton(
            "H3",
            () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            editor.isActive("heading", { level: 3 })
          )}
          {toolbarButton(
            "Paragraph",
            () => editor.chain().focus().setParagraph().run(),
            editor.isActive("paragraph")
          )}
          {toolbarButton(
            "Bold",
            () => editor.chain().focus().toggleBold().run(),
            editor.isActive("bold")
          )}
          {toolbarButton(
            "Italic",
            () => editor.chain().focus().toggleItalic().run(),
            editor.isActive("italic")
          )}
          {toolbarButton(
            "Strike",
            () => editor.chain().focus().toggleStrike().run(),
            editor.isActive("strike")
          )}
          {toolbarButton(
            "Highlight",
            () => editor.chain().focus().toggleHighlight().run(),
            editor.isActive("highlight")
          )}
          {toolbarButton(
            "Left",
            () => editor.chain().focus().setTextAlign("left").run(),
            editor.isActive({ textAlign: "left" })
          )}
          {toolbarButton(
            "Center",
            () => editor.chain().focus().setTextAlign("center").run(),
            editor.isActive({ textAlign: "center" })
          )}
          {toolbarButton(
            "Right",
            () => editor.chain().focus().setTextAlign("right").run(),
            editor.isActive({ textAlign: "right" })
          )}
          {toolbarButton(
            "Justify",
            () => editor.chain().focus().setTextAlign("justify").run(),
            editor.isActive({ textAlign: "justify" })
          )}
         
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="border p-4 rounded min-h-[300px]"
        />

        {/* Update Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
