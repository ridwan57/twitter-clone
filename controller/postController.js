import User from "../models/User";
import bcrypt from "bcrypt";
import Post from "../models/Post";

export const createPost = async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  var postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  if (req.body.replyTo) {
    postData.replyTo = req.body.replyTo;
  }

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" });

      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getPosts = async (req, res, next) => {
  const createdAt = "createdAt";
  let posts = await getPostsFunc();
  return res.status(201).send(posts);

  console.log("req:", content);
};

export const getPostById = async (req, res, next) => {
  const postId = req.params.id;
  let posts = await getPostsFunc({ _id: postId }).catch(() => {});
  return res.status(201).send(posts[0]);

  console.log("req:", content);
};

export const likePost = async (req, res, next) => {
  let postId = req.params.id;
  let { _id, likes } = req.session.user;
  let userId = _id;
  let isLiked = likes && likes.includes(postId);
  let option = isLiked ? "$pull" : "$addToSet";

  //insert user like
  req.session.user = await User.findByIdAndUpdate(
    userId,
    {
      [option]: { likes: postId },
    },
    { new: true }
  ).catch((err) => {
    console.log("liking post database error");
    return res.sendStatus(404);
  });

  //insert post like

  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { likes: userId },
    },
    { new: true }
  ).catch((err) => {
    console.log("liking post database error");
    return res.sendStatus(404);
  });
  //   posts = await User.populate(posts, { path: "postedBy" });
  return res.status(201).send(post);

  console.log("req:", content);
};

export const retweetPost = async (req, res, next) => {
  let postId = req.params.id;
  let userId = req.session.user._id;

  // Try and delete retweet
  let deletedPost = await Post.findOneAndDelete({
    postedBy: userId,
    retweetData: postId,
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  let option = deletedPost != null ? "$pull" : "$addToSet";

  let repost = deletedPost;

  if (repost == null) {
    repost = await Post.create({ postedBy: userId, retweetData: postId }).catch(
      (error) => {
        console.log(error);
        res.sendStatus(400);
      }
    );
  }

  // Insert user like
  req.session.user = await User.findByIdAndUpdate(
    userId,
    { [option]: { retweets: repost._id } },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  // Insert post like
  let post = await Post.findByIdAndUpdate(
    postId,
    { [option]: { retweetUsers: userId } },
    { new: true }
  ).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.status(200).send(post);
};

async function getPostsFunc(filter = {}) {
  var results = await Post.find(filter)
    .populate("postedBy")
    .populate("retweetData")
    .populate("replyTo")
    .sort({ createdAt: -1 })
    .catch((error) => console.log(error));

  results = await User.populate(results, { path: "replyTo.postedBy" });
  return await User.populate(results, { path: "retweetData.postedBy" });
}
