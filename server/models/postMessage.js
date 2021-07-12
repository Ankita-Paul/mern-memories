import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    creator: String,
    name: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("PostMessage", postSchema);
export default Post;
