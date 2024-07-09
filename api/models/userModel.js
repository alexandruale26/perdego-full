import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import slugify from "../utils/slugify.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Introdu numele tau."],
      minLength: 3,
      maxLength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Introdu adresa ta de email."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Introdu o adresa de email valida."],
    },
    password: {
      type: String,
      required: [true, "Introdu parola ta."],
      // TODO: change to 12 in production
      minLength: 4,
      maxLength: 30,
      trim: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Confirma parola ta."],
      // This only works on CREATE and SAVE (new entry) not UPDATE
      // Don't ever use UPDATE methods when dealing with passwords and security
      validate: {
        validator(value) {
          return value === this.password;
        },
        message: "Parolele nu se potrivesc.",
      },
      trim: true,
    },
    phone: {
      // TODO: convert input to a phone number. eliminate spaces and dashes
      // TODO: use schema from frontend
      type: String,
      required: [true, "Introdu numarul tau de telefon."],
      match: [/^07\d{8}$/, "Introdu un numar de telefon valid."], // !!! this is not good
    },

    // TODO: solve location issues
    location: {
      type: String,
    },
    slug: {
      type: String,
      default: () => slugify(),
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

const seconds = 1;
const getMsFromSeconds = (secs) => secs * 1000;

// This only works on CREATE and SAVE (new entry) not UPDATE
// Don't ever use UPDATE methods when dealing with passwords and security
// AVAILABLE ON ALL "PRE" MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // Token is created before "passwordChangedAt" timestamp, decrement time with 1 second to ensure
  // that token is created after "passwordChangedAt" - vital for "changedPasswordAfter" method
  this.passwordChangedAt = Date.now() - getMsFromSeconds(seconds);
  next();
});

// Instance method, available on all (User) documents
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedAtInSecs = parseInt(
      this.passwordChangedAt.getTime() / getMsFromSeconds(seconds),
      10,
    );

    return JWTTimestamp < passwordChangedAtInSecs;
  }

  // FALSE - password not changed after token was created
  return false;
};

export default mongoose.model("User", userSchema);
