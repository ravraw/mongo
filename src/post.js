const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  required: ["true", "Title is required"]
});

module.exports = PostSchema;
