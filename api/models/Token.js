import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 }); // 7 * 24 * 60 * 60

export default mongoose.model("Token", tokenSchema);
