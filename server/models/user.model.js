const mongoose = require("mongoose");
require("./post.model");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
        unique: true,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },

    phonenumber: {
      type: String,
      required: [true, "phonenumber is a required field"],
    },

    countrycode: {
      type: String,
      required: [true, "You have to select your country code"],
    },

    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
