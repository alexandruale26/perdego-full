import mongoose from "mongoose";
import slugify from "../utils/slugify.js";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Introdu un titlu"],
      minlength: [10, "Titlul este prea scurt."],
      maxlength: [60, "Titlul este prea lung."],
    },
    description: {
      type: String,
      required: [true, "Introdu o descriere."],
      minlength: [20, "Descrierea este prea scurta."],
      maxlength: [300, "Descrierea este prea lunga."],
    },
    location: {
      // TODO: check if location is correct not randomly by brute force
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
    active: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    idSlug: {
      type: String,
      default: slugify(null, 10),
    },
    urlSlug: String,
  },
  { timestamps: true },
);

//TODO: watch if slug changes if title changes
//TODO: add expireAfterSeconds
postSchema.pre("save", function (next) {
  if (!this.isNew) return next();

  this.urlSlug = slugify(this.title.toLowerCase(), 4);
  next();
});

postSchema.pre("findOne", function (next) {
  this.populate({
    path: "postedBy",
    select: "name phone createdAt -_id",
  });

  next();
});

postSchema.post("findOne", async (doc) => {
  // TODO: should implement a mechanism that doesn't increment on user refresh or re-viewing
  if (doc) {
    doc.views += 1;
    await doc.save();
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
