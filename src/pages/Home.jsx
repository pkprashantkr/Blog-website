import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ce6925bea0354804a28fbdf6fe8b4c09`)
      .then(response => {
        // Initialize each blog with upvote and downvote counts
        const blogsWithVotes = response.data.articles.map(blog => ({
          ...blog,
          upvotes: 0,
          downvotes: 0
        }));
        setBlogs(blogsWithVotes);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleVote = (index, type) => {
    setBlogs(prevBlogs => {
      return prevBlogs.map((blog, i) => {
        if (i === index) {
          return {
            ...blog,
            upvotes: type === 'up' ? blog.upvotes + 1 : blog.upvotes,
            downvotes: type === 'down' ? blog.downvotes + 1 : blog.downvotes,
          };
        }
        return blog;
      });
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <div className="flex items-center justify-between">
              <Link to={`/blog/${index}`} className="text-blue-500">Read More</Link>
              <div className="flex items-center">
                <div className="flex items-center">
                  <AiFillLike
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleVote(index, 'up')}
                  />
                  <span className="ml-2">{blog.upvotes}</span>
                </div>
                <div className="flex items-center ml-4">
                  <AiFillDislike
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleVote(index, 'down')}
                  />
                  <span className="ml-2">{blog.downvotes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
