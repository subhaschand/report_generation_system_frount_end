// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: "login" });  // ✅ force collection name "login"

const User = mongoose.model("User", userSchema);

export default User;
