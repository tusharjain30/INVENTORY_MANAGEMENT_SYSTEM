import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minLength: [3, "Name must be contain at least 3 characters!"],
    maxLength: [32, "Name cannot exceed 32 character!"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: [true, "This Email is already exists, please Enter another email!"],
    validate: [validator.isEmail, "Please Enter Valid Email"]
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minLength: [8, "Password must contain at least 8 character!"],
    maxLength: [32, "Password cannot exceed 32 character!"],
    select: false,
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

const User = mongoose.model("User", userSchema);

export default User