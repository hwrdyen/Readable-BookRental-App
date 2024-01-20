import mongoose from "mongoose";
import { UserType } from "../shared/types";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  // check whether the password field of the user document has been modified
  // this is a mongoose function
  // returns "true", if the specified field has been modified since the document was initialized or saved
  // this ==> refers to the instance of the mongoose model to which the middleware is attached
  if (this.isModified("password") === true) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
