const multer = require("multer");
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: `${process.env.AWS_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET}`,
  },
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ProductUploader = multerS3({
  s3: s3,
  bucket: "thunder-market/product",
  acl: "public-read",
});

export const uploadProductImage = multer({
  dest: "uploads/product",
  storage: isHeroku ? s3ProductUploader : undefined,
});
