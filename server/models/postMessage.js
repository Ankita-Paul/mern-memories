import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    creator: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("PostMessage", postSchema);
export default Post;
