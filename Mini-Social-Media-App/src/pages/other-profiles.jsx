import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
  const { user_id } = useParams();
  const [profileInfo, setProfileInfo] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);

  const getProfileInfo = async () => {
    try {
      const profile = await axios.get(`/post/users-profile/${user_id}`);
      setProfileInfo(profile.data);

      const posts = await axios.get(`/post/users-posts/${user_id}`);
      setProfilePosts(posts.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  console.log(profileInfo);
  console.log("-----")
  console.log(profilePosts);
  console.log("-----")

  return (
    <div className="h-screen flex justify-center">
      <div id="profile-display">
        {profileInfo.map((profile) => (
          <div className="text-center mt-2" key={profile.id}>
            <h2>@{profile.username}</h2>

            <div className="flex justify-center gap-2">
              <span>Has posted: </span> <p>{profile.post_count} posts</p>
            </div>
          </div>
        ))}
        <hr className="my-2"/>
        {profilePosts.map((post) => (
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
      </div>
    </div>
  );
};
