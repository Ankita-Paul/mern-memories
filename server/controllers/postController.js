import Post from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = (req, res) => {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId });
  newPost.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("yes");
    return res.status(404).send("no post With that id");
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("yes");
    return res.status(404).send("no post With that id");
  }
  await Post.findByIdAndRemove(_id)
    .then(() => {
      res.json({ message: "Post Deleted Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const userIdFromReq = req.userId;
  if (!userIdFromReq) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("yes");
    return res.status(404).send("no post With that id");
  }
  try {
    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(userIdFromReq));
    if (index !== -1) {
      post.likes = post.likes.filter((id) => id !== String(userIdFromReq));
    } else {
      post.likes.push(userIdFromReq);
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
      res.json(updatedPost);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
