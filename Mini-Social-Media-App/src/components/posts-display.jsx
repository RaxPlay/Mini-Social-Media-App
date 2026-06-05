import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PostsDisplay = ({ user }) => {
  const [postsDisplay, setPostsDisplay] = useState([]);
  const [commentForm, setCommentForm] = useState("");
  const [commentDisplay, setCommentDisplay] = useState([]);

  const getPostComments = async (post_id) => {
    try {
      const res = await axios.get(`/post/get-comments/${post_id}`);
      console.log(res.data);
      setCommentDisplay(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("/post/get-posts");

      setPostsDisplay(res.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (post_id) => {
    let modal = document.getElementById("modal");
    modal.style.display = "block";

    getPostComments(post_id);
  };

  const closeModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  };

  const newComment = async (post_id) => {
    try {
      if(commentForm === ""){
        return alert("Can't post an empty comment")
      }

      const body = { post_id: post_id, comment_description: commentForm };

      console.log(post_id);

      await axios.post(`/post/new-comment`, body);

      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async(comment_id) => {
    try {
      await axios.delete(`/post/delete-comment/${comment_id}`)
      commentDisplay.filter(comment => comment.commentary_id !== comment_id);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {postsDisplay.map((post) => (
        <div key={post.post_id}>
          <div className="p-1">
            <div className="flex justify-between">
              <Link to={`/profile/${post.user_name}`}>
                <p className="hover:underline hover:cursor-pointer">
                  @{post.user_name}
                </p>
              </Link>{" "}
              <span>{post.date_of_creation}</span>
            </div>
            <p className="ml-3">{post.post_description}</p>
            <button
              onClick={() => openModal(post.post_id)}
              id="comment-button"
              className="my-1 ml-3"
            >
              <i className="fa-regular fa-comment"></i>
            </button>

            <div id="modal">
              <div className="modal-content">
                <div className="flex justify-center gap-2.5 mt-2">
                  <input
                    type="text"
                    placeholder="Be nice!"
                    value={commentForm}
                    onChange={(e) => {
                      setCommentForm(e.target.value);
                    }}
                  />
                  <button onClick={() => newComment(post.post_id)}>
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  <button onClick={closeModal} className="close-modal-button">
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>

                <hr className="mt-4 mb-2" />

                <div id="comment-displayer">
                  {commentDisplay.map((comment) => (
                    <div key={comment.commentary_id}>
                      {user.username === comment.comentator ? (
                        <div>
                          <div className="flex justify-between">
                            <Link to={`/profile/${comment.comentator}`}>
                              <p className="hover:underline hover:cursor-pointer">
                                @{comment.comentator}
                              </p>
                            </Link>{" "}
                            <span>{comment.date_of_creation}</span>
                          </div>
                          <p className="ml-3">{comment.comment_description}</p>
                          <button onClick={() => deleteComment(comment.commentary_id)} className="delete-button ml-2 mt-1">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between">
                            <Link to={`/profile/${comment.comentator}`}>
                              <p className="hover:underline hover:cursor-pointer">
                                @{comment.comentator}
                              </p>
                            </Link>{" "}
                            <span>{comment.date_of_creation}</span>
                          </div>
                          <p className="ml-3">{comment.comment_description}</p>
                        </div>
                      )}

                      <hr className="my-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr />
        </div>
      ))}
    </>
  );
};
