import mongoose from "mongoose";

//Creamos el esquema para los posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  comments: [
    {
      username: { type: String, required: true },
      body: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
});

//Creamos el modelo de post
const Post = mongoose.model("Post", postSchema);

export default Post;