import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PostsDisplay = ({ user }) => {
  const [postsDisplay, setPostsDisplay] = useState([]);

  const getPosts = async () => {
    try {
      const res = await axios.get("/post/get-posts");

      setPostsDisplay(res.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {postsDisplay.map((post) => (
        <div key={post.post_id}>
          <div className="p-1">
            <div className="flex justify-between">
              <Link to={`/profile/${post.user_id}`} >
                <p className="hover:underline hover:cursor-pointer">
                  @{post.user_name}
                </p>
              </Link>{" "}
              <span>{post.date_of_creation}</span>
            </div>
            <div>{post.post_description}</div>
            <div className="mt-2">
              <button id="like-button">
                <i className="fa-solid fa-heart"></i>
              </button>
              {post.like_count}
            </div>
          </div>

          <hr />
        </div>
      ))}
    </>
  );
};
