import mongoose from "mongoose";
import slugify from "../utils/slugify.js";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Introdu un titlu"],
      minlength: 10,
      maxlength: 60,
    },
    description: {
      type: String,
      required: [true, "Introdu o descriere."],
      minlength: 20,
      maxlength: 300,
    },
    location: {
      type: String,
      required: [true, "Alege o locatie."],
    },
    category: {
      type: String,
      required: [true, "Alege o categorie."],
    },
    type: {
      type: String,
      required: [true, "Alege tipul anuntului."],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
    idSlug: {
      type: String,
      default: slugify(null, 10),
    },
  },
  { timestamps: true },
);

//TODO: watch if slug changes if title changes
//TODO: add expireAfterSeconds
postSchema.pre("save", function (next) {
  this.urlSlug = slugify(this.title.toLowerCase(), 10);
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
