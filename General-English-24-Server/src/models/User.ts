import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String
    },
    nic: {
      type: String,
      required: [true, "NIC number is required!"],
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required!"],
      unique: true,
    },
    district: {
      type: String,
      required: [true, "District is required!"],
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
