import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ce6925bea0354804a28fbdf6fe8b4c09`)
      .then(response => {
        setBlog(response.data.articles[id]);
      })
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  const handleCommentSubmit = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{blog.content}</p>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full"
            placeholder="Write a comment..."
          />
          <button onClick={handleCommentSubmit} className="bg-blue-500 text-white p-2 rounded mt-2">
            Submit Comment
          </button>
        </div>
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mb-2">
              {comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
