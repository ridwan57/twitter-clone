import express from "express";
import { createPost, getPosts } from "../controller/postController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.post("/api/posts", requireLogin, createPost);
router.get("/api/posts", getPosts);
module.exports = router;
