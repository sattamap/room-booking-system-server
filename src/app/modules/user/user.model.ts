import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";

interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema
const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // select: false to exclude password by default
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Pre-save middleware to hash the password if it is modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = ""; // Set password to an empty string
  next();
});

// Method to compare the provided password with the stored hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Define and export the model
const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema,
);
export default UserModel;
