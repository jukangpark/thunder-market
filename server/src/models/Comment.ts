import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, required: true, default: Date.now },
  category: { type: String },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
