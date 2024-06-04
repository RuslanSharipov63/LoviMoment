const mongoose = require("mongoose");
const PhotoSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" /* то есть мы ссылаемся на другую схему и таким образом делаем связь между двумя таблицами. то есть в будущем мы можем сказать, чтобы нам нашли пользователя по id */,
      required: true,
    },
    price: {
      type: Number
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photo", PhotoSchema);
