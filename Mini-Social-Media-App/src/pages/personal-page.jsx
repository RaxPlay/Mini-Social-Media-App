import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const YourPage = ({ user }) => {
  console.log(user);

  const [profileInfo, setProfileInfo] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);

  const getProfileInfo = async () => {
    try {
      const profile = await axios.get(`/post/users-profile/${user.username}`);
      setProfileInfo(profile.data);

      const posts = await axios.get(`/post/users-posts/${user.username}`);
      setProfilePosts(posts.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async(post_id) => {
    try {
      await axios.delete(`/post/delete-post/${post_id}`)
      profileInfo.filter(post => post.id !== post_id);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div className="h-screen flex justify-center">
      <div id="profile-display">
        {profileInfo.map((profile) => (
          <div className="text-center mt-2" key={profile.id}>
            <h2>{profile.username}</h2>

            <div className="flex justify-center gap-2">
              <span>You've posted: </span> <p>{profile.post_count} posts</p>
            </div>
          </div>
        ))}
        <hr className="my-2" />
        {profilePosts.map((post) => (
          <div key={post.post_id}>
            <div className="p-1">
              <div className="flex justify-between">
                <Link to={`/your-profile`}>
                  <p className="hover:underline hover:cursor-pointer">
                    @{post.user_name}
                  </p>
                </Link>{" "}
                <span>{post.date_of_creation}</span>
              </div>
              <div>{post.post_description}</div>
              <div className="mt-2 flex justify-between ">
                <button id="like-button">
                  <i className="fa-solid fa-heart"></i>
                  {post.like_count}
                </button>

                <button className="delete-button" onClick={() => deletePost(post.post_id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
