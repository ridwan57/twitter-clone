import express from "express";
import { createPost } from "../controller/postController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.post("/api/posts", requireLogin, createPost);
module.exports = router;
