import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;
 const UserSchema = new Schema({
  Fullname: {
    type: String,
    required: true,
  },
  Tel: {
    type: String,
    match: [
      /^(06|07|05)[0-9]{8}$/,
      "Enter a valid telephone number (e.g., 06xxxxxxxx)",
    ],
  },
  password: {
    type: String,
    required: true,
    required: [true, "Password is required"],
    minlength: [8, "Password is too short"],
  },
  image: { type: Buffer, default: null },
  Role: {
    type: String,
    enum: ["admin", "user"],
  },
});
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare hashed password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
