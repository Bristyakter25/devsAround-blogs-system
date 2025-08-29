import React, { useState, useContext } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import AuthContext from "../../Context/AuthContext"; // logged-in user info

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // custom slug input
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
    ],
    content: "",
  });

  if (!editor) return null;

//   const addImage = () => {
//     const url = prompt("Enter image URL");
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("You must be logged in to publish a blog.");
      return;
    }

    const contentHTML = editor.getHTML();
    const excerpt = contentHTML.replace(/<[^>]+>/g, "").slice(0, 200);

    const blogData = {
      title,
      slug: slug || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
      excerpt,
      content: contentHTML,
      coverImageUrl: coverImage, // only file input goes here
      tags: tags.split(",").map((t) => t.trim()),
      authorEmail: user.email,
      authorName: user.displayName,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        alert("Blog published successfully!");
        setTitle("");
        setSlug("");
        setCoverImage(null);
        setTags("");
        editor.commands.clearContent();
      } else {
        alert("Failed to publish blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error publishing blog");
    }
  };

  const toolbarButton = (label, command, isActive = false) => (
    <button
      type="button"
      onClick={command}
      className={`px-2 py-1 border rounded ${
        isActive ? "bg-black text-white" : "bg-white text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Write a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Enter slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Cover Image */}
        <div>
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    id="coverImageInput"
    className="hidden"
    onChange={(e) => setCoverImage(URL.createObjectURL(e.target.files[0]))}
  />

  {/* Custom button */}
  <label
    htmlFor="coverImageInput"
    className="px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-800"
  >
    Choose Image
  </label>

  {/* Preview */}
  {coverImage && (
    <img src={coverImage} alt="cover" className="mt-2 rounded-lg max-h-60" />
  )}
</div>


        {/* Tags */}
        <input
          type="text"
          placeholder="Enter tags, separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Toolbar */}
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

        <EditorContent editor={editor} className="border p-4 rounded min-h-[300px]" />

        <button
          type="submit"
          className="px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
