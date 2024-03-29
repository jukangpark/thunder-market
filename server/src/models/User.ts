import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  profileImageUrl: { type: String },
  password: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, required: true, default: Date.now },
  introduction: { type: String },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
}); // 해시함수 를 통해 비밀 번호 암호화

const User = mongoose.model("User", userSchema);

export default User;
