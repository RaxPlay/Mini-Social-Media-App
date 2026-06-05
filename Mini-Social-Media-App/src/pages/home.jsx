import React, { useState } from "react";
import axios from "axios";
import { NavBar } from "../components/v-navbar";
import { PostsDisplay } from "../components/posts-display";
import { Link } from "react-router-dom";

export const Home = ({ user, setUser }) => {
  const [postForm, setPostForm] = useState({
    post_description: "",
  });

  const newPost = async (e) => {
    e.preventDefault();
    if (postForm.post_description === "") {
      return alert("Can't post an empty post");
    } else {
      try {
        const newPost = await axios.post("/post/new-post", postForm);
        location.reload()
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div id="home-display">
        {user ? (
          <div>
            <div id="container" className="rounded-b-md p-5">
              <form className="flex justify-center gap-3" onSubmit={newPost}>
                <input
                  type="text"
                  placeholder="What are you thinking about?"
                  value={postForm.post_description}
                  onChange={(e) => {
                    setPostForm({
                      ...postForm,
                      post_description: e.target.value,
                    });
                  }}
                  required
                  className="w-57"
                />
                <button onClick={newPost}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </form>
            </div>

            <div id="post-display" className="mt-2">
              <PostsDisplay user={user} />
            </div>
          </div>
        ) : (
          <div id="post-display" className="flex justify-center items-center">
            <Link to="/login">
              <h2 className="hover:underline">Please Login First</h2>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
