import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  categories: { type: String, required: true },
  meta: {
    views: { type: Number, default: 0 },
  },
  location: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  newProduct: { type: String, required: true }, // 새상품인지 중고상품인지.
  change: { type: String, required: true }, // 교환 가능상품인지 아닌지.
  price: { type: Number, required: true },
  delivery: { type: Boolean, required: true },
  description: { type: String, required: true },
  hashtags: { type: String, trim: true },
});

// image 는 여러개가 될 수 있기 때문에
// imageUrl 은 배열의 형태를 띕니다.

// productSchema.static("formatHashtags", function (hashtags) {
//   return hashtags
//     .split(",")
//     .map((word: string) => (word.startsWith("#") ? word : `#${word}`));
// });

const Product = mongoose.model("Product", productSchema);
export default Product;
