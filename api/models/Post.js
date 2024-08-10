import mongoose from "mongoose";
import slugify from "../utils/slugify.js";

const postSchema = new mongoose.Schema(
  // TODO: ZOD schema validation urgent
  {
    // TODO: add trim to all strings or use zod validation
    title: {
      type: String,
      required: [true, "Introdu un titlu"],
      minLength: [15, "Titlul este prea scurt."],
      maxLength: [70, "Titlul este prea lung."],
    },
    description: {
      type: String,
      required: [true, "Introdu o descriere."],
      minLength: [20, "Descrierea este prea scurta."],
      maxLength: [500, "Descrierea este prea lunga."],
    },
    location: {
      // TODO: check if location is correct to avoid brute force - to all selectors
      type: String,
      required: [true, "Alege o locatie."],
    },
    name: {
      // TODO: username
      type: String,
      required: [true, "Introdu numele tau."],
      minLength: 3,
      maxLength: 32,
      trim: true,
    },
    phone: {
      // TODO: use schema from frontend
      type: String,
      required: [true, "Introdu numarul tau de telefon."],
      // !!! this is not good
      // match: [/^07\d{8}$/, "Introdu un numar de telefon valid."],
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
    urlSlug: String,
  },
  { timestamps: true },
);

postSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 24 * 60 * 60 });

//TODO: watch if slug changes if title changes on user post update
postSchema.pre("save", function (next) {
  if (!this.isNew) return next();
  this.urlSlug = slugify(this.title.toLowerCase(), 4);

  next();
});

postSchema.pre("findOne", function (next) {
  this.populate({
    path: "postedBy",
    select: "name phone createdAt -_id", // TODO: phone should not come by default, only when requested
  });

  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
