import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  retweetPost,
} from "../controller/postController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.post("/api/posts", requireLogin, createPost);
router.get("/api/posts", getPosts);
router.put("/api/posts/:id/like", requireLogin, likePost);
router.post("/api/posts/:id/retweet", requireLogin, retweetPost);
module.exports = router;
