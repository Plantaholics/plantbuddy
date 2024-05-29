const mongoose = require("mongoose");
const { Schema, model } = mongoose;


// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    plantCare: {
      type:mongoose.Schema.Types.ObjectId, ref: "PlantCare"
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
