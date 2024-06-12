import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Introdu numele tau."],
      minLength: 3,
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

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

  // Token is created before this timestamp so we decrement time with 1 second to ensure
  // that token is created after password change - vital for "changedPasswordAfter" method
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance method, available on all (User) documents
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model("User", userSchema);
