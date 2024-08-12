import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import slugify from "../utils/slugify.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Introdu adresa ta de email."],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Introdu o adresǎ de email validǎ."],
    },
    password: {
      type: String,
      required: [true, "Introdu parola ta."],
      minLength: 12,
      maxLength: 30,
      trim: true,
      select: false,
    },
    userSlug: {
      type: String, // daca o sa implementez chat
      default: slugify(null, 4),
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

const oneSecond = 1000;

// This only works on CREATE and SAVE (new entry) not UPDATE
// Don't ever use UPDATE methods when dealing with passwords and security
// AVAILABLE ON ALL "PRE" MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // Token is created before "passwordChangedAt" timestamp, decrement time with 1 second to ensure
  // that token is created after "passwordChangedAt" - vital for "changedPasswordAfter" method
  this.passwordChangedAt = Date.now() - oneSecond;
  next();
});

// Instance method, available on all (User) documents
userSchema.methods.isValidPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedAtInSecs = parseInt(
      this.passwordChangedAt.getTime() / oneSecond,
      10,
    );

    return JWTTimestamp < passwordChangedAtInSecs;
  }

  // FALSE - password not changed after token was created
  return false;
};

export default mongoose.model("User", userSchema);
