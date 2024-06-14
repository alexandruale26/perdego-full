import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Introdu un titlu"],
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
