import axios from "axios";
import React, { useEffect, useState } from "react";

export const PostsDisplay = ({ user }) => {
  const [postsDisplay, setPostsDisplay] = useState([]);

  const getPosts = async () => {
    try {
      const res = await axios.get("/post/get-posts");

      setPostsDisplay(res.data.rows);
      console.log(res.data.rows);
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
        <div id="post" key={post.post_id}>
          <div className="p-1">
            <div className="flex justify-between">
              @{post.user_name} <span>{post.date_of_creation}</span>
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
