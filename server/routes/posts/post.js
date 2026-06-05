import express from "express";
import { pool } from "../../config/db.js";
import { protect } from "../../middleware/protect.js";

const postRouter = express.Router();

//New Post
postRouter.post("/new-post", protect, async (req, res) => {
  try {
    const { post_description } = req.body;

    const newPost = await pool.query(
      "INSERT INTO post(post_description, user_name, user_id) VALUES($1, $2, $3) RETURNING *",
      [post_description, req.user.username, req.user.id],
    );

    await pool.query(
      "UPDATE users SET post_count = post_count + 1 WHERE id = $1",
      [req.user.id],
    );

    res.status(201).json(newPost.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Getting all posts
postRouter.get("/get-posts", protect, async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM post");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
  }
});

//Getting specific user's info
postRouter.get("/users-profile/:user_name", protect, async (req, res) => {
  try {
    const { user_name } = req.params;

    const userInfo = await pool.query(
      "SELECT username, post_count, id FROM users WHERE username = $1",
      [user_name],
    );

    res.status(200).json(userInfo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Getting specific user's posts
postRouter.get("/users-posts/:user_name", protect, async (req, res) => {
  try {
    const { user_name } = req.params;

    const userPosts = await pool.query(
      "SELECT post_description, post_id, date_of_creation, user_name FROM post WHERE user_name = $1",
      [user_name],
    );

    res.status(200).json(userPosts.rows);
  } catch (error) {
    console.error(error.message);
  }
});

postRouter.post("/new-comment", protect, async (req, res) => {
  try {
    const { post_id, comment_description } = req.body;

    const newComment = await pool.query(
      "INSERT INTO commentaries(post, comentator, comment_description) VALUES($1, $2, $3) RETURNING *",
      [post_id, req.user.username, comment_description],
    );

    res.status(201).json(newComment.rows);
  } catch (error) {
    console.error(error.message);
  }
});

postRouter.get("/get-comments/:post_id", protect, async (req, res) => {
  try {
    const { post_id } = req.params;

    const postComments = await pool.query(
      "SELECT * FROM commentaries WHERE post = $1",
      [post_id],
    );

    res.status(200).json(postComments.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Deleting a post
postRouter.delete("/delete-post/:post_id", protect, async (req, res) => {
  try {
    const { post_id } = req.params;

    await pool.query("DELETE FROM commentaries WHERE comentary_id = $1", [
      post_id,
    ]);

    await pool.query("DELETE FROM post WHERE post_id = $1", [post_id]);

    await pool.query(
      "UPDATE users SET post_count = post_count - 1 WHERE id = $1",
      [req.user.id],
    );
  } catch (error) {
    console.error(error.message);
  }
});

postRouter.delete("/delete-comment/:commentary_id", protect, async (req, res) => {
  try {
    const { commentary_id } = req.params;

    await pool.query("DELETE FROM commentaries WHERE commentary_id = $1", [
      commentary_id,
    ]);
  } catch (error) {
    console.error(error.message);
  }
});

export default postRouter;
