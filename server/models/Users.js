import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const Users = mongoose.model("users", UserSchema);

export default Users;
