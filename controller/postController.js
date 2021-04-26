import User from "../models/User";
import bcrypt from "bcrypt";
import Post from "../models/Post";

export const createPost = async (req, res, next) => {
  if (!req.body.content) {
    return res.sendStatus(404);
  }
  const { content } = req.body;
  let newPost = await Post.create({
    content,
    postedBy: req.session.user,
  }).catch((err) => {
    console.log("creating post database error");
    return res.sendStatus(404);
  });
  newPost = await User.populate(newPost, { path: "postedBy" });
  return res.status(201).send(newPost);

  console.log("req:", content);
};

export const getPosts = async (req, res, next) => {
  const createdAt = "createdAt";
  let posts = await Post.find({})
    .populate("postedBy")
    .sort({ createdAt: -1 })
    .catch((err) => {
      console.log("creating post database error");
      return res.sendStatus(404);
    });
  //   posts = await User.populate(posts, { path: "postedBy" });
  return res.status(201).send(posts);

  console.log("req:", content);
};
