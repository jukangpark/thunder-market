import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comments" },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
