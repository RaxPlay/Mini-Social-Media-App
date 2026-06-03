import express from "express";
import { pool } from "../../config/db.js";
import { protect } from "../../middleware/protect.js";

const postRouter = express.Router();

postRouter.post("/new-post", protect, async (req, res) => {
  try {
    const { post_description, like_count } = req.body;

    const newPost = await pool.query(
      "INSERT INTO post(post_description, like_count, user_name, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [post_description, like_count, req.user.username, req.user.id],
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

postRouter.get("/get-posts", protect, async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM post");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
  }
});

postRouter.get("/users-profile/:user_name", protect, async (req, res) => {
  try {
    const { user_name } = req.params;

    const userInfo = await pool.query("SELECT username, post_count, id FROM users WHERE username = $1", [user_name]);

    res.status(200).json(userInfo.rows)
  } catch (error) {
    console.error(error.message);
  }
});

//Get posts from specific
postRouter.get("/users-posts/:user_name", protect, async (req, res) => {
  try {
    const { user_name } = req.params;

    const userPosts = await pool.query("SELECT post_description, post_id, date_of_creation, user_name, like_count FROM post WHERE user_name = $1", [user_name]);

    res.status(200).json(userPosts.rows)
  } catch (error) {
    console.error(error.message);
  }
});

postRouter.delete("/delete-post/:post_id", protect, async (req, res) => {
  try {
    const { post_id } = req.params;

    await pool.query("DELETE FROM post WHERE post_id = $1", [post_id]);

    await pool.query(
      "UPDATE users SET post_count = post_count - 1 WHERE id = $1",
      [req.user.id],
    );
  } catch (error) {
    console.error(error.message);
  }
});

export default postRouter;
