import express from "express";
import { pool } from "../../config/db.js";
import { protect } from "../../middleware/protect.js";

const postRouter = express.Router();

postRouter.post("/new-post", protect, async (req, res) => {
  try {
    const { post_description, like_count } = req.body; //Like count should start on 0

    const newPost = await pool.query(
      "INSERT INTO post(post_description, like_count, user_name, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [post_description, like_count, req.user.username, req.user.id],
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
    console.error(error.message)
  }
})

postRouter.delete("/delete-post/:post_id", protect, async(req, res) => {
  try {
    const { post_id } = req.params;

    await pool.query("DELETE FROM post WHERE post_id = $1", [post_id])

  } catch (error) {
    console.error(error.message);
  }
})

export default postRouter;