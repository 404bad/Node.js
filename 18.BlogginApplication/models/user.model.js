import mongoose from "mongoose";
import crypto from "crypto";
import { createTokenForUser } from "../services/authentication.service.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/user-avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(this.password, this.salt, 100000, 64, "sha512")
    .toString("hex");
});

userSchema.statics.matchPasswordAndGenerateToken = async function (
  email,
  plainPassword
) {
  const user = await this.findOne({ email });
  if (!user) return null;

  const hashedInputPassword = crypto
    .pbkdf2Sync(plainPassword, user.salt, 100000, 64, "sha512")
    .toString("hex");

  if (hashedInputPassword !== user.password) return null;
  const token = createTokenForUser(user);

  return token;
};

const User = mongoose.model("user", userSchema);
export default User;
