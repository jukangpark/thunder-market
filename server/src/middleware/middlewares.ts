const multer = require("multer");

export const uploadProduct = multer({
  dest: "uploads/product",
  storage: undefined,
});
