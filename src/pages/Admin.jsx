import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');

  const handleCreate = async () => {
    const docRef = await addDoc(collection(db, "blogs"), {
      title: newBlog,
      content: "Your content here"
    });
    setBlogs([...blogs, { id: docRef.id, title: newBlog, content: "Your content here" }]);
    setNewBlog('');
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleEdit = async (id, newContent) => {
    const blogDoc = doc(db, "blogs", id);
    await updateDoc(blogDoc, { content: newContent });
    setBlogs(blogs.map(blog => blog.id === id ? { ...blog, content: newContent } : blog));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newBlog}
          onChange={(e) => setNewBlog(e.target.value)}
          className="border p-2 w-full"
          placeholder="New blog title"
        />
        <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded mt-2">
          Create Blog
        </button>
      </div>
      <div>
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <button onClick={() => handleEdit(blog.id, 'Updated Content')} className="bg-blue-500 text-white p-2 rounded">
              Edit
            </button>
            <button onClick={() => handleDelete(blog.id)} className="bg-red-500 text-white p-2 rounded ml-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
